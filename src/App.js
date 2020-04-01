import { useSnackbar } from "notistack";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { infoNotify } from './constants/notistackOption';
import PageProvider from "./context/PageProvider";
import { auth } from './firebase/firebase';
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/login/LoginPage";
import ManagerPage from "./pages/manager/ManagerPage";
import NoMatchPage from "./pages/noMatch/NoMatchPage";
import OperatorPage from "./pages/operator/OperatorPage";
import { makeStyles, CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  }
}))


export default function App() {

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  // message.requestPermission()
  //   .then(async () => {
  //     const token = await message.getToken();
  //   })
  //   .catch(function (err) {
  //     console.log("Unable to get permission to notify.", err);
  //   });

  navigator.serviceWorker.addEventListener("message", (message) => {
    enqueueSnackbar(message.data['firebase-messaging-msg-data'].notification.title, infoNotify);
  });

  return (
    <div className={classes.root}>
      <CssBaseline />
      <PageProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login" >
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
        </Router>
      </PageProvider>
    </div>
  );
}

// let currentUser = {
//   isAuthenticated: true,
//   role: null
// };

function PrivateRoute({ children, ...rest }) {
  //   const currentUser = authenticationService.currentUserValue;

  console.log("Go to private route");

  let firebaseUser = auth.currentUser;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        firebaseUser ? (
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
