import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

import HttpError from "../models/http-error";
import User, { IUser } from "../models/user";

config();

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (e) {
    return next(new HttpError("Could not create user", 500));
  }

  const createdUser = new User({
    email,
    name,
    imageUrl: req.file ? req.file.path : "",
    password: hashedPassword,
    places: []
  } as IUser);

  try {
    await createdUser.save();
  } catch (e) {
    return next(new HttpError("Cannot signup", 500));
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (e) {
    return next(new HttpError("Cannot signup", 500));
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token });
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

  if (!user) {
    return next(new HttpError("Could not identify user.", 401));
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (e) {
    return next(
      new HttpError("Could not login, please check your credentials.", 500)
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Could not login, please check your credentials.", 500)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (e) {
    return next(new HttpError("Cannot signup", 500));
  }

  res.json({ userId: user.id, email: email.id, token });
};
