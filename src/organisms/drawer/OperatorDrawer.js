import React, { useState } from 'react';
import { makeStyles, Drawer, Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { DRAWER_WIDTH } from '../../constants/dimension';
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TrashCarIcon from '@material-ui/icons/LocalShipping';
import NotificationIcon from '@material-ui/icons/Notifications';
import RouterLink from 'react-router-dom/Link';



const useStyle = makeStyles((theme) => ({
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
    toolbar: theme.mixins.toolbar,
}))

export default function OperatorDrawer() {
    const classes = useStyle();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    }


    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbar} />
            <Divider />
            <List component="nav">
                <ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)} component={RouterLink} to="/operator">
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)} component={RouterLink} to="/operator/collect">
                    <ListItemIcon><LocationOnIcon /></ListItemIcon>
                    <ListItemText primary="Collect Trash" />
                </ListItem>
                <ListItem button selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)} component={RouterLink} to="/operator/driver">
                    <ListItemIcon><TrashCarIcon /></ListItemIcon>
                    <ListItemText primary="Driver" />
                </ListItem>
                <ListItem button selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)} component={RouterLink} to="/operator/notification">
                    <ListItemIcon><NotificationIcon /></ListItemIcon>
                    <ListItemText primary="Notification" />
                </ListItem>
            </List>
        </Drawer>
    )

}