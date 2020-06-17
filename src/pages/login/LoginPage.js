import React, { useContext } from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import LoginForm from "../../organisms/loginForm/LoginForm";
import { PageContext } from "../../context/PageProvider";
import { useHistory } from "react-router-dom";

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

  const pageData = useContext(PageContext);

  const history = useHistory();

  if (!pageData.isHomePageVisited) {
    history.push("/");
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Đăng nhập
        </Typography>
        <LoginForm />
      </div>
    </Container>
  );
}
