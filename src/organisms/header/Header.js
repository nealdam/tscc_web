import { AppBar, Badge, Button, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import NotificationIcon from "@material-ui/icons/Notifications";
import React, { useContext } from "react";
import { auth } from "../../firebase/firebase";
import { DRAWER_WIDTH } from "../../constants/dimension";
import { UserContext } from "../../context/PageProvider";

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
          /Page title/
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
