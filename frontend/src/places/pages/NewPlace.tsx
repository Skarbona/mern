import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./PlaceForm.scss";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
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
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const placeSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    const {
      inputs: { title, description, address, image }
    } = formState;
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title.value);
      formData.append("description", description.value);
      formData.append("address", address.value);
      formData.append("image", image.value);

      await send({
        url: process.env.REACT_APP_BACKEND_API + "/places",
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
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
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image"
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
