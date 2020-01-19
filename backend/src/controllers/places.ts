import { NextFunction, Request, Response } from "express";

import { IPlaceItem } from "../../../frontend/src/places/components/PlaceList.interface";
import HttpError from "../models/http-error";

const PLACES: IPlaceItem[] = [
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
  const user = PLACES.find(u => u.creator === userId);

  if (!user) {
    return next(new HttpError("Could not find resources for provided Id", 404));
  }

  res.json({ user });
};

export const createPlace = (
    req: Request,
    res: Response,
    next: NextFunction
) => {};