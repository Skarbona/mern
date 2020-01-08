import React from "react";

import "./MainHeader.scss";

const MainHeader: React.FC<IMainHeader> = ({ children }) => {
  return <header className="main-header">{children}</header>;
};

export default MainHeader;

interface IMainHeader {
  children: React.ReactChild;
}
