import { NextFunction, Request, Response, Router } from "express";

import { IUser } from "../../../frontend/src/users/components/UserList.interface";

const router = Router();

const USERS: IUser[] = [
  { id: "1", name: "Filip", image: "http://i.pravatar.cc/300", places: 3 },
  { id: "2", name: "Ola", image: "http://i.pravatar.cc/299", places: 4 },
  { id: "3", name: "Andrzej", image: "http://i.pravatar.cc/298", places: 0 }
];

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json(USERS);
});

router.get("/:userId", (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  const user = USERS.find(u => u.id === userId);
  res.json({ user });
});

export default router;
