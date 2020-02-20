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
import firebase from 'firebase/app'

export default function App() {
  
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyCPEyplo1MwwQwtomYxzaq_yQxymYD5AwU",
      authDomain: "tscc-notification.firebaseapp.com",
      databaseURL: "https://tscc-notification.firebaseio.com",
      projectId: "tscc-notification",
      storageBucket: "tscc-notification.appspot.com",
      messagingSenderId: "951076084886",
      appId: "1:951076084886:web:e5244ed835616b4859f6b7"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

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
