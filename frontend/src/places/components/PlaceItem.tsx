import React, { useState, useContext } from "react";

import "./PlaceItem.scss";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";

const PlaceItem: React.FC<IPlaceItem> = ({
  id,
  image,
  title,
  description,
  address,
  coordinates,
  onDelete,
  creatorId
}) => {
  const { isLoggedIn, userId } = useContext(AuthContext);
  const { isLoading, error, send, clearError } = useHttp();
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const openMap = () => setShowMap(true);
  const closeMap = () => setShowMap(false);

  const showDeleteWarning = () => setShowConfirmModal(true);
  const cancelDeleteWarning = () => setShowConfirmModal(false);
  const confirmDelete = async () => {
    cancelDeleteWarning();
    try {
      await send({
        url: `http://localhost:5000/api/places/${id}`,
        method: "DELETE"
      });
      onDelete(id);
    } catch (e) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarning}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteWarning}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDelete}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className="place-item__image">
              <img src={`http://localhost:5000/${image}`} alt={title} />
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
              {isLoggedIn && userId === creatorId && (
                <React.Fragment>
                  <Button to={`/places/${id}`}>EDIT</Button>
                  <Button danger onClick={showDeleteWarning}>
                    DELETE
                  </Button>
                </React.Fragment>
              )}
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
  onDelete(id: string): void;
}
