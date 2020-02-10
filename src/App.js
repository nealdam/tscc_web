import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import OperatorPage from "./pages/operator/OperatorPage";
import ManagerPage from "./pages/manager/ManagerPage";
import NoMatchPage from "./pages/noMatch/NoMatchPage";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/operator">
            <OperatorPage />
          </PrivateRoute>
          <PrivateRoute path="/manager">
            <ManagerPage />
          </PrivateRoute>
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const currentUser = {
  isAuthenticated: false
};

function PrivateRoute({ children, ...rest }) {
  //   const currentUser = authenticationService.currentUserValue;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        currentUser.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
