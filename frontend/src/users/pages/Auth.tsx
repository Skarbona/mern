import React, { useState, useContext } from "react";

import "./Auth.scss";
import Card from "../../shared/components/UIElements/Card";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Auth: React.FC<{}> = () => {
  const { login } = useContext(AuthContext);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const { isLoading, error, clearError, send } = useHttp();

  const authSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      inputs: { name, email, password, image }
    } = formState;

    if (isLoginMode) {
      try {
        const { userId, token } = await send({
          url: `${process.env.REACT_APP_BACKEND_API}/users/login`,
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        });
        login(userId, token);
      } catch (e) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", email.value);
        formData.append("name", name.value);
        formData.append("password", password.value);
        formData.append("image", image.value);
        const { userId, token } = await send({
          url: `${process.env.REACT_APP_BACKEND_API}/users/signup`,
          method: "POST",
          body: formData
        });
        login(userId, token);
      } catch (e) {}
    }
  };

  const switchModeHandler = () => {
    const {
      inputs: { email, password }
    } = formState;

    if (!isLoginMode) {
      const newFormData = {
        ...formState.inputs
      };
      delete newFormData.name;
      delete newFormData.image;
      setFormData(
        {
          ...newFormData
        },
        email.isValid && password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        <React.Fragment>
          {isLoading && <LoadingSpinner asOverlay />}
          <h2>Login Required</h2>
          <hr />
          <form onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <React.Fragment>
                <Input
                  element="input"
                  id="name"
                  type="text"
                  label="Your Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a name."
                  onInput={inputHandler}
                />
                <ImageUpload id="image" center onInput={inputHandler} />
              </React.Fragment>
            )}
            <Input
              id="email"
              element="input"
              type="email"
              label="E-mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please a valid email address"
              onInput={inputHandler}
            />
            <Input
              id="password"
              element="input"
              type="password"
              label="Password"
              validators={[VALIDATOR_MINLENGTH(6)]}
              errorText="Please a valid email password"
              onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
          </form>
          <Button inverse onClick={switchModeHandler}>
            {isLoginMode ? "SWITCH TO SIGNUP" : "SWITCH TO LOGIN"}
          </Button>
        </React.Fragment>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
