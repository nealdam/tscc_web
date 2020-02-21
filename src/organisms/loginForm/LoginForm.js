import React, { useState, useEffect } from "react";
import { TextField, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import firebase from 'firebase';
import { useSnackbar } from "notistack";
import { successNotify, errorNotify } from "../../constants/notistackOption";

export default function LoginForm() {

  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    //TODO: validate
    firebase
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then(response => {
        enqueueSnackbar("Login success", successNotify);
      })
      .catch(error => {
        enqueueSnackbar("Incorrect email or password", errorNotify);
      });
  }

  return (
    <form>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button type="submit" fullWidth variant="contained" color="primary" onClick={(e) => handleLogin(e)}>
        Login
      </Button>
    </form>
  );
}
