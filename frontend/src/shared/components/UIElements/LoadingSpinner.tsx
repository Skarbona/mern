import React from "react";

import "./LoadingSpinner.scss";

const LoadingSpinner: React.FC<ILoadingSpinner> = ({ asOverlay = false }) => {
  return (
    <div className={`${asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring" />
    </div>
  );
};

export default LoadingSpinner;

interface ILoadingSpinner {
  asOverlay?: boolean;
}
