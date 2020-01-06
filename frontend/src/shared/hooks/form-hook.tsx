import { useCallback, useReducer } from "react";

export enum newPlaceActionTypes {
  INPUT_CHANGE = "INPUT CHANGE"
}

export const formReducer = (
  state: INewPlaceState,
  action: INewPlaceAction
): INewPlaceState => {
  switch (action.type) {
    case newPlaceActionTypes.INPUT_CHANGE: {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid: formIsValid
      };
    }

    default:
      return state;
  }
};

export const useForm = (
  initialInputs: INewPlaceState["inputs"],
  initialIsValid: boolean
): [INewPlaceState, (id: string, value: string, isValid: boolean) => void] => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialIsValid
  } as INewPlaceState);

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) =>
      dispatch({
        type: newPlaceActionTypes.INPUT_CHANGE,
        value,
        isValid,
        inputId: id
      }),
    []
  );

  return [state, inputHandler];
};

interface INewPlaceAction {
  type: newPlaceActionTypes;
  isValid: boolean;
  value: string;
  inputId: string;
}

export interface INewPlaceState {
  inputs: {
    [inputId: string]: {
      value: string | undefined;
      isValid: boolean;
    };
  };
  isValid: boolean;
}
