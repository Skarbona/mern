import { useCallback, useReducer } from "react";

import { formReducer } from "./reducer";
import { INewPlaceState } from "./interface";
import { inputChangeAction, setFormDataAction } from "./actions";

export const useForm = (
  initialInputs: INewPlaceState["inputs"],
  initialIsValid: boolean
): [
  INewPlaceState,
  (id: string, value: string, isValid: boolean) => void,
  (inputs: INewPlaceState["inputs"], isValid: boolean) => void
] => {
  const [state, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialIsValid
  } as INewPlaceState);

  const inputHandler = useCallback(
    (id: string, value: any, isValid: boolean) =>
      dispatch(inputChangeAction(id, value, isValid)),
    []
  );

  const setFormData = useCallback(
    (inputs: INewPlaceState["inputs"], isValid: boolean) =>
      dispatch(setFormDataAction(inputs, isValid)),
    []
  );

  return [state, inputHandler, setFormData];
};
