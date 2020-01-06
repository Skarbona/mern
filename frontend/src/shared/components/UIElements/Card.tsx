import React from "react";

import "./Card.scss";

const Card: React.FC<ICard> = ({ className, style, children }) => {
  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Card;

interface ICard {
  className?: string;
  style?: {
    [id: string]: string;
  };
  children: React.ReactChild;
}
