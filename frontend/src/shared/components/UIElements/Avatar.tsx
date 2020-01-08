import React from "react";

import "./Avatar.scss";

const Avatar: React.FC<IAvatar> = ({ className, style, image, alt, width }) => {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </div>
  );
};

export default Avatar;

interface IAvatar {
  className?: string;
  style?: {
    [id: string]: string;
  };
  image: string;
  alt: string;
  width?: string;
}
