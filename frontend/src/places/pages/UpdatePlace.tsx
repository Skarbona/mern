import React from "react";
import { useParams } from "react-router-dom";

import { IPlaceItem } from "../components/PlaceList";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validators";
import "./PlaceForm.scss";
import { useForm } from "../../shared/hooks/form-hook";

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

const UpdatePlace: React.FC<{}> = () => {
  const { placeId } = useParams();
  const identifiedPlace = PLACES.find(p => p.id === placeId);

  const [
    {
      isValid,
      inputs: { title, description }
    },
    inputHandler
  ] = useForm(
    {
      title: {
        value: identifiedPlace && identifiedPlace.title,
        isValid: true
      },
      description: {
        value: identifiedPlace && identifiedPlace.description,
        isValid: true
      }
    },
    true
  );

  const placeUpdateSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, description);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Cannot not find place!</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        initialValue={title.value}
        initialIsValid={title.isValid}
      />
      <Input
        id="description"
        label="Description"
        element="textarea"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min 5 characters)"
        onInput={inputHandler}
        initialValue={description.value}
        initialIsValid={description.isValid}
      />
      <Button type="submit" disabled={!isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
