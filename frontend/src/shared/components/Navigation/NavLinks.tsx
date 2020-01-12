import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.scss";
import { AuthContext } from "../../context/auth-context";
import Button from "../FormElements/Button";

const NavLinks: React.FC<{}> = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {isLoggedIn && (
        <React.Fragment>
          <li>
            <NavLink to="/1/places" exact>
              MY PLACES
            </NavLink>
          </li>
          <li>
            <NavLink to="/places/new" exact>
              ADD PLACE
            </NavLink>
          </li>
          <li>
            <Button onClick={logout}>LOGOUT</Button>
          </li>
        </React.Fragment>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth" exact>
            AUTHENTICATE
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
