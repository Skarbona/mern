import {
  INewPlaceInputChangeAction,
  INewPlaceState,
  newPlaceActionTypes
} from "./interface";

export const inputChangeAction = (id: string, value: any, isValid: boolean) =>
  ({
    type: newPlaceActionTypes.INPUT_CHANGE,
    value,
    isValid,
    inputId: id
  } as INewPlaceInputChangeAction);

export const setFormDataAction = (
  inputs: INewPlaceState["inputs"],
  isValid: boolean
) =>
  ({
    type: newPlaceActionTypes.SET_DATA,
    inputs,
    isValid
  } as INewPlaceInputChangeAction);
