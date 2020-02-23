import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import User, { IUser } from "../models/user";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({}, "-password");
    res.json({ users: users.map(user => user.toObject({ getters: true })) });
  } catch (e) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.json({ user: user.toObject({ getters: true }) });
  } catch (e) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
};

export const signUp = async (
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

  const { name, email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    return next(new HttpError("Please try again later", 500));
  }

  if (existingUser) {
    return next(new HttpError("User exist already", 422));
  }

  const createdUser = new User({
    email,
    name,
    imageUrl: req.file ? req.file.path : '',
    password,
    places: []
  } as IUser);

  try {
    await createdUser.save();
  } catch (e) {
    return next(new HttpError("Cannot signup", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email });
  } catch (e) {
    return next(new HttpError("Please try again later", 500));
  }

  if (!user || user.password !== password) {
    return next(new HttpError("Could not identify user.", 401));
  }

  res.json({ message: "Logged in!", user: user.toObject({ getters: true }) });
};
