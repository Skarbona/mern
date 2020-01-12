import {
  INewPlaceState,
  INewPlaceActionType,
  newPlaceActionTypes
} from "./interface";

export const formReducer = (
  state: INewPlaceState,
  action: INewPlaceActionType
): INewPlaceState => {
  switch (action.type) {
    case newPlaceActionTypes.INPUT_CHANGE: {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) continue;
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
    case newPlaceActionTypes.SET_DATA: {
      return {
        ...state,
        inputs: action.inputs,
        isValid: action.isValid
      };
    }
    default:
      return state;
  }
};
