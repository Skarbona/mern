import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Users from "./users/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Auth = lazy(() => import("./users/pages/Auth"));
const UsersPlaces = lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace"));
const NewPlace = lazy(() => import("./places/pages/NewPlace"));

const App: React.FC<{}> = () => {
  const { token, login, logout, userId } = useAuth();

  const routes = token ? (
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places" exact>
        <UsersPlaces />
      </Route>
      <Route path="/places/new" exact>
        <NewPlace />
      </Route>
      <Route path="/places/:placeId" exact>
        <UpdatePlace />
      </Route>
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact>
        <Users />
      </Route>
      <Route path="/:userId/places" exact>
        <UsersPlaces />
      </Route>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Redirect to="/auth" />
    </Switch>
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, login, logout, userId }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
