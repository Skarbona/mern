import React from "react";

import "./PlaceList.scss";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

const PlaceList: React.FC<IPlaceList> = ({ items }) => {
  if (!items.length) {
    return (
      <div className="place-list center">
        <Card>
          <React.Fragment>
            <h2>No places found. Maybe create one?</h2>
            <button>Share Place</button>
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
        />
      ))}
    </ul>
  );
};

export default PlaceList;

export interface IPlaceItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface IPlaceList {
  items: IPlaceItem[];
}
