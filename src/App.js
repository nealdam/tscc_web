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
import firebase from 'firebase/app';
import { messaging } from './init-fcm';

export default function App() {

  messaging.requestPermission()
    .then(async function() {
			const token = await messaging.getToken();
    })
    .catch(function(err) {
      console.log("Unable to get permission to notify.", err);
    });
  navigator.serviceWorker.addEventListener("message", (message) => console.log(message));

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
  isAuthenticated: true
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
