import React, { useState } from "react";

import "./PlaceItem.scss";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";

const PlaceItem: React.FC<IPlaceItem> = ({
  id,
  image,
  title,
  description,
  address,
  coordinates,
  creatorId
}) => {
  const [showMap, setShowMap] = useState<boolean>(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMap}
        header={address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMap}>Close</Button>}
      >
        <div className="map-container">
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <React.Fragment>
            <div className="place-item__image">
              <img src={image} alt={title} />
            </div>
            <div className="place-item__info">
              <h2>{title}</h2>
              <h3>{address}</h3>
              <p>{description}</p>
            </div>
            <div className="place-item__actions">
              <Button inverse onClick={openMap}>
                VIEW ON MAP
              </Button>
              <Button to={`/places/${id}`}>EDIT</Button>
              <Button danger>DELETE</Button>
            </div>
          </React.Fragment>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;

interface IPlaceItem {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
