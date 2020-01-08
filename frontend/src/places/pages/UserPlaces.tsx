import React from "react";
import { useParams } from "react-router-dom";

import PlaceList, { IPlaceItem } from "../components/PlaceList";

const PLACES: IPlaceItem[] = [
  {
    id: "1",
    title: "Empire State Building",
    description: "Nice building",
    imageUrl: "http://www.dobresobie.pl/images/articles/208.jpg",
    address: "20 W 34th St, New York, NY 10001, Stany Zjednoczone",
    creator: "1",
    location: {
      lng: -73.9856644,
      lat: 40.7484405
    }
  },
  {
    id: "2",
    title: "Empire State Building",
    description: "Nice building 2",
    imageUrl: "http://www.dobresobie.pl/images/articles/208.jpg",
    address: "20 W 34th St, New York, NY 10001, Stany Zjednoczone",
    creator: "2",
    location: {
      lng: -73.9856644,
      lat: 40.7484405
    }
  }
];

const UserPlaces: React.FC<{}> = () => {
  const { userId } = useParams();
  const userPlaces = PLACES.filter(place => place.creator === userId);
  return <PlaceList items={userPlaces} />;
};

export default UserPlaces;
