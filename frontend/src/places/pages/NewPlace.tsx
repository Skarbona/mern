import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./PlaceForm.scss";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const NewPlace: React.FC<{}> = () => {
  const auth = useContext(AuthContext);
  const { isLoading, send, clearError, error } = useHttp();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      address: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const {
      inputs: { title, description, address }
    } = formState;
    e.preventDefault();
    try {
      await send({
        url: "http://localhost:5000/api/places",
        method: "POST",
        body: JSON.stringify({
          title: title.value,
          description: description.value,
          address: address.value,
          creator: auth.userId
        }),
        headers: { "Content-Type": "application/json" }
      });
      history.push("/");
    } catch (e) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          type="text"
          element="input"
          label="Title"
          id="title"
          errorText="Please enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          label="Description"
          id="description"
          errorText="Please enter a valid description (at least 5 characters)"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
        />
        <Input
          type="input"
          element="input"
          label="Address"
          id="address"
          errorText="Please enter a valid address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
