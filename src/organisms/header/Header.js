import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { DRAWER_WIDTH } from "../../constants/dimension";
import { UserContext } from "../../context/PageProvider";
import { auth } from "../../firebase/firebase";

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();

  const userData = useContext(UserContext);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Trash Support Collection & Classification
        </Typography>
        <Typography variant="subtitle1" style={{ marginRight: 16 }}>
          {userData.userEmail}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => auth.signOut()}
        >
          Logout
          </Button>
      </Toolbar>
    </AppBar>
  );
}
