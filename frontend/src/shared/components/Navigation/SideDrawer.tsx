import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.scss";

const SideDrawer: React.FC<ISideDrawer> = ({ children, show, onClick }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(
    content,
    document.querySelector("#drawer-hook")!
  );
};

export default SideDrawer;

interface ISideDrawer {
  children: React.ReactChild;
  show: boolean;
  onClick(): void;
}
