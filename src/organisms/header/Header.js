import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  makeStyles,
  Button
} from "@material-ui/core";
import NotificationIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            /Page title/
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationIcon />
            </Badge>
          </IconButton>
          <Typography variant="subtitle1">
            Operator 123
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
