import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.scss";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDraw from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation: React.FC<IMainNavigation> = () => {
  const [isDrawOpen, setDrawnState] = useState<boolean>(false);

  const openDrawer = () => setDrawnState(true);
  const closeDrawer = () => setDrawnState(false);

  return (
    <React.Fragment>
      {isDrawOpen && <Backdrop onClick={closeDrawer} />}
      <SideDraw show={isDrawOpen} onClick={closeDrawer}>
        <main className="main-navigation__drawer-nav">
          <NavLinks />
        </main>
      </SideDraw>
      <MainHeader>
        <React.Fragment>
          <button className="main-navigation__menu-btn" onClick={openDrawer}>
            <span />
            <span />
            <span />
          </button>
          <h1 className="main-navigation__title">
            <Link to="/"> YourPlaces</Link>
          </h1>
          <nav className="main-navigation__header-nav">
            <NavLinks />
          </nav>
        </React.Fragment>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;

interface IMainNavigation {}
