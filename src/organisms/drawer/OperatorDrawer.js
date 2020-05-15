import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import TrashCarIcon from '@material-ui/icons/LocalShipping';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DRAWER_WIDTH } from '../../constants/dimension';



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
                    <ListItemText primary="Trạng thái thu gom" />
                </ListItem>
                <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)} component={RouterLink} to="/operator/collect">
                    <ListItemIcon><LocationOnIcon /></ListItemIcon>
                    <ListItemText primary="Thu gom rác" />
                </ListItem>
                <ListItem button selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)} component={RouterLink} to="/operator/driver">
                    <ListItemIcon><TrashCarIcon /></ListItemIcon>
                    <ListItemText primary="Tài xế" />
                </ListItem>
                {/* <ListItem button selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)} component={RouterLink} to="/operator/notification">
                    <ListItemIcon><NotificationIcon /></ListItemIcon>
                    <ListItemText primary="Notification" />
                </ListItem> */}
            </List>
        </Drawer>
    )

}