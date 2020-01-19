import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import uuid from "uuid/v4";

import { IPlaceItem } from "../../../frontend/src/places/components/PlaceList.interface";
import HttpError from "../models/http-error";
import getCoordsForAddress from "../util/google-map";

let PLACES: IPlaceItem[] = [
  {
    id: "1",
    title: "Empire State Building",
    description: "Nice building",
    imageUrl: "http://www.dobresobie.pl/images/articles/208.jpg",
    address: "20 W 34th St, New York, NY 10001, Stany Zjednoczone",
    creator: "1",
    location: {
      lng: -73.9856644,
      lat: 40.7484405
    }
  },
  {
    id: "2",
    title: "Empire State Building",
    description: "Nice building 2",
    imageUrl: "http://www.dobresobie.pl/images/articles/208.jpg",
    address: "20 W 34th St, New York, NY 10001, Stany Zjednoczone",
    creator: "2",
    location: {
      lng: -73.9856644,
      lat: 40.7484405
    }
  }
];

export const getAllPlaces = (req: Request, res: Response, next: NextFunction) =>
  res.json(PLACES);

export const getPlaceById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { placeId } = req.params;
  console.log("hello");
  const place = PLACES.find(p => p.id === placeId);

  if (!place) {
    return next(new HttpError("Could not find resources for provided Id", 404));
  }

  res.json({ place });
};

export const getPlacesByUserId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const places = PLACES.filter(u => u.creator === userId);

  if (!places.length) {
    return next(new HttpError("Could not find resources for provided Id", 404));
  }

  res.json({ places });
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

  const createdPlace = {
    id: uuid(),
    imageUrl: "",
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = (
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

  const updatedPlace = { ...PLACES.find(p => p.id === placeId) };

  if (updatedPlace) {
    const placeIndex = PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    PLACES[placeIndex] = updatedPlace;
  }

  res.json({ place: updatedPlace });
};

export const deletePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { placeId } = req.params;

  if (!PLACES.find(p => p.id === placeId)) {
    throw new HttpError("Could not find place for provided Id", 404);
  }

  PLACES = PLACES.filter(p => p.id !== placeId);

  res.json({ message: "Deleted place." });
};
