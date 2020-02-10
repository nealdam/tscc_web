import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import LoginForm from "../../organisms/loginForm/LoginForm";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

export default function LoginPage() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <LoginForm />
      </div>
    </Container>
  );
}
