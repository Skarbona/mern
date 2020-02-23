export enum newPlaceActionTypes {
  INPUT_CHANGE = "INPUT_CHANGE",
  SET_DATA = "SET_DATA"
}

export interface INewPlaceAction {
  type: newPlaceActionTypes;
  isValid: boolean;
}

export interface INewPlaceInputChangeAction extends INewPlaceAction {
  value: string;
  inputId: string;
}

export interface INewPlaceInputChangeAction extends INewPlaceAction {
  inputs: INewPlaceState["inputs"];
}

export type INewPlaceActionType =
  | INewPlaceInputChangeAction
  | INewPlaceInputChangeAction;

export interface INewPlaceState {
  inputs: {
    [inputId: string]: {
      value: any;
      isValid: boolean;
    };
  };
  isValid: boolean;
}
