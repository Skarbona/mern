import React from "react";

import "./UsersList.scss";
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import { IUserList } from "./UserList.interface";

const UserList: React.FC<IUserList> = ({ items }) => {
  if (!items || !items.length) {
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
          image={user.imageUrl}
          name={user.name}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UserList;
