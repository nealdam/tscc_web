import { AppBar, Dialog, DialogContent, Grid, IconButton, makeStyles, Slide, Toolbar, Typography, Tooltip, Popover } from '@material-ui/core';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import React, { useState } from 'react';
import TrashAreaStatusTable from '../trashAreaTable/TrashAreaStatusTable';
import OperatorIcon from '@material-ui/icons/SupervisorAccount';
import DriverIcon from '@material-ui/icons/LocalShipping';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(2),
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
})

function JobStatusDetailDialog(props) {

    const classes = useStyles();

    const { open, setOpen, collectJob } = props;

    const [operatorAnchorEl, setOperatorAnchorEl] = useState(null);
    const [driverAnchorEl, setDriverAnchorEl] = useState(null);

    const handleOperatorPopoverOpen = (event) => {
        setOperatorAnchorEl(event.currentTarget);
    }

    const handleOperatorPopoverClose = () => {
        setOperatorAnchorEl(null);
    }

    const handleDriverPopoverOpen = (event) => {
        setDriverAnchorEl(event.currentTarget);
    }

    const handleDriverPopoverClose = () => {
        setDriverAnchorEl(null);
    }

    const isOperatorPopoverOpen = Boolean(operatorAnchorEl);
    const isDriverPopoverOpen = Boolean(driverAnchorEl);


    const handleDialogClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleDialogClose}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge='start' color="inherit" onClick={handleDialogClose} aria-label="close">
                        <ArrowDownIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Collect Job Detail
                    </Typography>
                    <IconButton
                        aria-owns={isOperatorPopoverOpen ? 'operator-mouse-over-popover' : undefined}
                        color="inherit"
                        style={{ marginRight: 16 }}
                        aria-haspopup="true"
                        onMouseEnter={handleOperatorPopoverOpen}
                        onMouseLeave={handleOperatorPopoverClose}
                    >
                        <OperatorIcon />
                    </IconButton>
                    <IconButton
                        aria-owns={isDriverPopoverOpen ? 'driver-mouse-over-popover' : undefined}
                        color="inherit"
                        style={{ marginRight: 16 }}
                        aria-haspopup="true"
                        onMouseEnter={handleDriverPopoverOpen}
                        onMouseLeave={handleDriverPopoverClose}

                    >
                        <DriverIcon />
                    </IconButton>
                    <Popover
                        id="operator-mouse-over-popover"
                        className={classes.popover}
                        classes={{
                            paper: classes.paper,
                        }}
                        open={open}
                        anchorEl={operatorAnchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handleOperatorPopoverClose}
                        disableRestoreFocus
                    >
                        <Typography>I use operator.</Typography>
                    </Popover>
                    <Popover
                        id="driver-mouse-over-popover"
                        className={classes.popover}
                        classes={{
                            paper: classes.paper,
                        }}
                        open={open}
                        anchorEl={driverAnchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        onClose={handleDriverPopoverClose}
                        disableRestoreFocus
                    >
                        <Typography>I use driver.</Typography>
                    </Popover>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <TrashAreaStatusTable trashAreas={collectJob.trashAreas} />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default JobStatusDetailDialog;