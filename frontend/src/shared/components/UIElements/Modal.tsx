import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Modal.scss";
import Backdrop from "./Backdrop";

const ModalOverlay: React.FC<IModalOverlay> = ({
  className,
  style,
  headerClass,
  contentClass,
  header,
  children,
  onSubmit,
  footerClass,
  footer
}) => {
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : e => e.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{children}</div>
      </form>
      <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
    </div>
  );
  return ReactDOM.createPortal(content, document.querySelector("#modal-hook")!);
};

const Modal: React.FC<IModal> = ({
  show,
  onCancel,
  className,
  style,
  headerClass,
  contentClass,
  header,
  children,
  onSubmit,
  footerClass,
  footer
}) => {
  return (
    <React.Fragment>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay
          className={className}
          style={style}
          headerClass={headerClass}
          contentClass={contentClass}
          header={header}
          children={children}
          onSubmit={onSubmit}
          footerClass={footerClass}
          footer={footer}
        />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;

interface IModalOverlay {
  className?: string;
  style?: {
    [type: string]: string;
  };
  headerClass?: string;
  contentClass?: string;
  header?: string;
  onSubmit?(): void;
  children?: React.ReactChild;
  footer?: any;
  footerClass?: string;
}

interface IModal extends IModalOverlay {
  show: boolean;
  onCancel?(): void;
}
