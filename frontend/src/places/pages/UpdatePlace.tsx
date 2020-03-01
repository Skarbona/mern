import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import { IPlaceItem } from "../components/PlaceList.interface";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validators";
import "./PlaceForm.scss";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const UpdatePlace: React.FC<{}> = () => {
  const auth = useContext(AuthContext);
  const { placeId } = useParams();
  const { isLoading, error, clearError, send } = useHttp();
  const [place, setPlace] = useState<IPlaceItem | null>(null);
  const history = useHistory();

  const [
    {
      isValid,
      inputs: { title, description }
    },
    inputHandler,
    setFormData
  ] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const data = await send({
          url: `http://localhost:5000/api/places/${placeId}`
        });
        setPlace(data.place);
        setFormData(
          {
            title: {
              value: data.place.title,
              isValid: true
            },
            description: {
              value: data.place.description,
              isValid: true
            }
          },
          true
        );
      } catch (e) {}
    };
    fetchPlace();
  }, [send, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    await send({
      url: `http://localhost:5000/api/places/${placeId}`,
      method: "PATCH",
      body: JSON.stringify({
        title: title.value,
        description: description.value
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`
      }
    });
    history.push(`/${auth.userId}/places`);
  };

  if (!place && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Cannot not find place!</h2>
        </Card>
      </div>
    );
  }

  if (!title.value || isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
    </React.Fragment>
  );
};

export default UpdatePlace;
