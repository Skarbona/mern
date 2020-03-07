import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { IPlaceItem } from "../components/PlaceList.interface";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserPlaces: React.FC<{}> = () => {
  const { isLoading, send, error, clearError } = useHttp();
  const [places, setPlaces] = useState<IPlaceItem[] | null>(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await send({
          url: `${process.env.REACT_APP_BACKEND_API}/places/user/${userId}`
        });
        setPlaces(data.places);
      } catch (e) {}
    };
    fetchPlaces();
  }, [send, userId]);
  const userPlaces = places && places.filter(place => place.creator === userId);
  const onDeleteHandler = (deletedPlaceId: string) => {
    setPlaces(
      prevPlace =>
        prevPlace && prevPlace.filter(place => place.id !== deletedPlaceId)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <PlaceList items={userPlaces} onDelete={onDeleteHandler} />
    </React.Fragment>
  );
};

export default UserPlaces;
