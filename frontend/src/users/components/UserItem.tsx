import React from "react";
import { Link } from "react-router-dom";

import "./UserItem.scss";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

const UserItem: React.FC<IUserItem> = ({ id, name, placeCount, image }) => {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={`http://localhost:5000/${image}`} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount > 0 ? (
                <React.Fragment>
                  {placeCount} {placeCount === 1 ? "Place" : "Places"}
                </React.Fragment>
              ) : (
                <React.Fragment>No places</React.Fragment>
              )}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;

interface IUserItem {
  id: string;
  name: string;
  placeCount: number;
  image: string;
}
