import React from "react";

import "./UsersList.scss";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";

const UserList: React.FC<IUserList> = ({ items }) => {
  if (!items.length) {
    return (
      <div className="center">
        <Card>
          <h2>Not users found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UserList;

export interface IUser {
  id: string;
  name: string;
  places: number;
  image: string;
}

interface IUserList {
  items: IUser[];
}
