import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import fs from "fs";

import HttpError from "../models/http-error";
import getCoordsForAddress from "../util/google-map";
import Place, { IPlace } from "../models/place";
import User, { IUserType } from "../models/user";

export const getAllPlaces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const places = await Place.find();
    res.json(places.map(place => place.toObject({ getters: true })));
  } catch (e) {
    return next(
      new HttpError("Something went wrong, could not find place", 500)
    );
  }
};

export const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { placeId } = req.params;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (e) {
    return next(
      new HttpError("Something went wrong, could not find place", 500)
    );
  }

  if (!place) {
    return next(new HttpError("Could not find resources for provided Id", 404));
  }

  res.json({ place: place.toObject({ getters: true }) });
};

export const getPlacesByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (e) {
    return next(
      new HttpError("Something went wrong, could not find places", 500)
    );
  }

  if (!places.length) {
    return next(new HttpError("Could not find resources for provided Id", 404));
  }

  res.json({ places: places.map(place => place.toObject({ getters: true })) });
};

export const createPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (e) {
    return next(e);
  }

  const createdPlace = new Place({
    title,
    description,
    imageUrl: req.file.path,
    address,
    location: coordinates,
    creator
  } as IPlace);

  let user;
  try {
    user = await User.findById(creator);
  } catch (e) {
    return next(new HttpError("Creating place failed, please try again", 500));
  }

  if (!user) {
    return next(new HttpError("Creating not find user for provided user", 404));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session });
    await user.places.push(createdPlace.id);
    await user.save({ session });
    await session.commitTransaction();
  } catch (e) {
    return next(new HttpError("Creating place failed, please try again", 500));
  }

  res.status(201).json({ place: createdPlace.toObject({ getters: true }) });
};

export const updatePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { title, description } = req.body;
  const { placeId } = req.params;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (e) {
    return next(
      new HttpError("Something went wrong, could not find place", 500)
    );
  }

  if (place) {
    place.title = title;
    place.description = description;
    try {
      await place.save();
    } catch (e) {
      return next(
        new HttpError("Something went wrong, could not update place", 500)
      );
    }
  }

  res.json({ place: place.toObject({ getters: true }) });
};

export const deletePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { placeId } = req.params;

  try {
    const place = await Place.findById(placeId).populate("creator");
    if (!place) {
      return next(new HttpError("Place doesn't exist", 404));
    }

    const imagePath = place.imageUrl;

    const session = await mongoose.startSession();
    session.startTransaction();
    await place.remove({ session } as any);
    const creator = (place.creator as unknown) as IUserType;
    await creator.places.pull(place);
    await creator.save({ session });
    await session.commitTransaction();

    fs.unlink(imagePath, err => console.log(err));
  } catch (e) {
    return next(
      new HttpError("Something went wrong, could not find place", 500)
    );
  }

  res.json({ message: "Deleted place." });
};
