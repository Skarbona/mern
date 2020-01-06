import React, { useReducer, useEffect } from "react";

import "./Input.scss";
import { validate, IValidatorAction } from "../../utils/validators";

enum InputActions {
  CHANGE = "CHANGE",
  TOUCH = "TOUCH"
}

const inputReducer = (state: InputState, action: IInputAction): InputState => {
  switch (action.type) {
    case InputActions.CHANGE:
      return {
        ...state,
        value: action.value!,
        isValid: validate(action.value, action.validators!)
      };
    case InputActions.TOUCH:
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input: React.FC<IInput> = ({
  id,
  label,
  element,
  type = "text",
  placeholder = "",
  rows = 3,
  errorText = "Input is invalid",
  validators,
  onInput,
  initialValue = "",
  initialIsValid = false
}) => {
  const [{ value, isValid, isTouched }, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    isValid: initialIsValid,
    isTouched: false
  });

  useEffect(
    () => {
      onInput(id, value, isValid);
    },
    // eslint-disable-next-line
    [value, isValid]
  );

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) =>
    dispatch({
      type: InputActions.CHANGE,
      value: e.target.value,
      validators
    });

  const touchHandler = () => {
    dispatch({ type: InputActions.TOUCH });
  };

  const formElement =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      />
    ) : (
      <textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      />
    );

  return (
    <div
      className={`form-control ${!isValid &&
        isTouched &&
        "form-control--invalid"}`}
    >
      <label htmlFor={id}>{label}</label>
      {formElement}
      {!isValid && isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;

interface IInput {
  id: string;
  label: string;
  element?: string;
  placeholder?: string;
  type?: string;
  rows?: number;
  errorText?: string;
  validators: IValidatorAction[];
  onInput(id: string, value: string, isValid: boolean): void;
  initialValue?: string | undefined;
  initialIsValid?: boolean;
}

interface IInputAction {
  type: InputActions;
  value?: string;
  validators?: IValidatorAction[];
}

interface InputState {
  value: string;
  isValid: boolean;
  isTouched: boolean;
}
