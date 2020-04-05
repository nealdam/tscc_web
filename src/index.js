import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SnackbarProvider } from "notistack";

// Register a service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

ReactDOM.render(
  <SnackbarProvider
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left'
    }}>
    <App />
  </SnackbarProvider>,
  document.getElementById("root")
);
