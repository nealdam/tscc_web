import { Dialog, DialogContent, DialogTitle, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, makeStyles, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { getCollectStatusAvatar } from '../../utils/statusUtil';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(2),
    }
}))

function JobStatusDetailDialog(props) {

    const classes = useStyles();

    const { open, setOpen, collectJob } = props;

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle>Collect Job Detail</DialogTitle>
            <DialogContent dividers>
                <Grid container component="paper" spacing={2}>
                    <Grid item xs={8}>
                        <List style={{ height: 400 }}>
                            {collectJob.trashAreas.map((trashArea) => (
                                <ListItem>
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
                    <Grid item xs={4} container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">Collector</Typography>
                            <TextField
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
            </DialogContent>
        </Dialog>
    )
}

export default JobStatusDetailDialog;