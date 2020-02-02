import React from "react";

import "./PlaceList.scss";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import { IPlaceList } from "./PlaceList.interface";

const PlaceList: React.FC<IPlaceList> = ({ items, onDelete }) => {
  if (!items || !items.length) {
    return (
      <div className="place-list center">
        <Card>
          <React.Fragment>
            <h2>No places found. Maybe create one?</h2>
            <Button to="/places/new">Share Place</Button>
          </React.Fragment>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
