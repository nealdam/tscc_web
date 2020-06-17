import { Button, Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { errorNotify, successNotify } from "../../constants/notistackOption";
import { signinWithEmailAndPassword } from "../../services/authService";

export default function LoginForm() {

  const { enqueueSnackbar } = useSnackbar();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    //TODO: validate
    signinWithEmailAndPassword(username, password)
      .then(response => {
        enqueueSnackbar("Đăng nhập thành công", successNotify);
      })
      .catch(error => {
        enqueueSnackbar("Sai tên đăng nhập hoặc mật khẩu", errorNotify);
        console.log("Error code: " + error.code);
        console.log("Error message: " + error.message);
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
        label="Tên đăng nhập"
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
        label="Mật khẩu"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Ghi nhớ"
      />
      <Button type="submit" fullWidth variant="contained" color="primary" onClick={(e) => handleLogin(e)}>
        Đăng nhập
      </Button>
    </form>
  );
}
