import { NextFunction, Request, Response } from "express";
import uuid from "uuid/v4";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";

interface IUser {
  email: string;
  password: string;
  name: string;
  id: string;
  image?: string;
  places?: number;
}

const USERS: IUser[] = [
  {
    id: "1",
    name: "Filip",
    image: "http://i.pravatar.cc/300",
    places: 3,
    email: "test@test.pl",
    password: "1234"
  },
  {
    id: "2",
    name: "Ola",
    image: "http://i.pravatar.cc/299",
    places: 4,
    email: "test2@test.pl",
    password: "1234"
  },
  {
    id: "3",
    name: "Andrzej",
    image: "http://i.pravatar.cc/298",
    places: 0,
    email: "test3@test.pl",
    password: "1234"
  }
];

export const getAllUsers = (req: Request, res: Response, next: NextFunction) =>
  res.json({ users: USERS });

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const user = USERS.find(u => u.id === userId);
  res.json({ user });
};

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = USERS.find(u => u.email === email);

  if (hasUser) {
    throw new HttpError(
      "Could not created user with provided email. Already exist.",
      422
    );
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password
  };

  USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const identifiedUser = USERS.find(u => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not identify user.", 401);
  }

  res.json({ message: "Logged in!" });
};
