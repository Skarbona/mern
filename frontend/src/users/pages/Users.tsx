import React from "react";

import UserList, { IUser } from "../components/UsersList";

const USERS: IUser[] = [
  { id: "1", name: "Filip", image: "http://i.pravatar.cc/300", places: 3 },
  { id: "2", name: "Ola", image: "http://i.pravatar.cc/299", places: 4 },
  { id: "3", name: "Andrzej", image: "http://i.pravatar.cc/298", places: 0 }
];

const Users: React.FC<{}> = () => <UserList items={USERS} />;

export default Users;
