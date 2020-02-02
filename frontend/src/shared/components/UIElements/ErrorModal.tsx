import React from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";

const ErrorModal: React.FC<IErrorModal> = ({ onClear, error }) => {
  return (
    <Modal
      onCancel={onClear}
      header="An Error Occurred!"
      show={!!error}
      footer={<Button onClick={onClear}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;

interface IErrorModal {
  onClear(): void;
  error: string;
}
