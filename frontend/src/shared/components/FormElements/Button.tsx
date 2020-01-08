import React from "react";
import { Link } from "react-router-dom";

import "./Button.scss";

const Button: React.FC<IButton> = ({
  size = "default",
  inverse = false,
  danger = false,
  href = "",
  children,
  to = "",
  exact = false,
  type = "button",
  onClick = () => {},
  disabled = false
}) => {
  if (href) {
    return (
      <a
        className={`button button--${size} ${inverse &&
          "button--inverse"} ${danger && "button--danger"}`}
        href={href}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className={`button button--${size} ${inverse &&
          "button--inverse"} ${danger && "button--danger"}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`button button--${size} ${inverse &&
        "button--inverse"} ${danger && "button--danger"}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

interface IButton {
  disabled?: boolean;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  href?: string;
  children: React.ReactChild;
  to?: string;
  exact?: boolean;
  type?: "submit" | "reset" | "button";
  onClick?(): void;
}
