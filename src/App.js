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
import { messaging } from './private/Firebase';
import { useSnackbar } from "notistack";
import { infoNotify } from './constants/notistackOption';

export default function App() {

  const { enqueueSnackbar } = useSnackbar();

  messaging.requestPermission()
    .then(async () => {
      const token = await messaging.getToken();
    })
    .catch(function (err) {
      console.log("Unable to get permission to notify.", err);
    });

  navigator.serviceWorker.addEventListener("message", (message) => {
    enqueueSnackbar(message.data['firebase-messaging-msg-data'].notification.title, infoNotify);
  });

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
  isAuthenticated: true,
  role: null
};

function PrivateRoute({ children, ...rest }) {
  //   const currentUser = authenticationService.currentUserValue;

  console.log("Go to private route");

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
