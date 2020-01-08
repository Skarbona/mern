import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.scss";

const Backdrop: React.FC<IBackdrop> = ({ onClick = () => {} }) =>
  ReactDOM.createPortal(
    <div className="backdrop" onClick={onClick} />,
    document.getElementById("backdrop-hook")!
  );

export default Backdrop;

interface IBackdrop {
  onClick?(): void;
}
