import { AppBar, Dialog, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Slide, TextField, Toolbar, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import React from 'react';
import { getCollectStatusAvatar } from '../../utils/statusUtil';

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
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
})

function JobStatusDetailDialog(props) {

    const classes = useStyles();

    const { open, setOpen, collectJob } = props;

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge='start' color="inherit" onClick={handleClose} aria-label="close">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Collect Job Detail
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <List>
                        {collectJob.trashAreas.map((trashArea) => (
                            <ListItem key={trashArea.id}>
                                <ListItemAvatar>
                                    {getCollectStatusAvatar(trashArea.status.name)}
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${trashArea.street}`}
                                    secondary={`Type: ${trashArea.type.name}, Width: ${trashArea.width.name}, Size: ${trashArea.size.name}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={3} container spacing={2} alignContent='flex-start'>
                    <Grid item xs={12}>
                        <Typography variant="h6">Collector</Typography>
                        <TextField
                            className={classes.textField}
                            label="Driver name"
                            size="small"
                            defaultValue={collectJob.driver.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            label="Employee code"
                            size="small"
                            defaultValue={collectJob.driver.employeeCode}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            label="Phone"
                            size="small"
                            defaultValue={collectJob.driver.phone}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Assigned by</Typography>
                        <TextField
                            className={classes.textField}
                            label="Operator name"
                            size="small"
                            defaultValue={collectJob.operator.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            label="Employee code"
                            size="small"
                            defaultValue={collectJob.operator.employeeCode}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            className={classes.textField}
                            label="Phone"
                            size="small"
                            defaultValue={collectJob.operator.phone}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    )
}

export default JobStatusDetailDialog;