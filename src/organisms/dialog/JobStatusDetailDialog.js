import React from 'react'
import { Dialog, DialogTitle, DialogContent, Grid, TextField, makeStyles, List, Avatar, ListItemText, ListItem, ListItemAvatar, Divider, Typography } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done';

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
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <List>
                            {collectJob.trashAreas.map((trashArea) => (
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <DoneIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${trashArea.street}`}
                                        secondary={`Type: ${trashArea.type.name}, Width: ${trashArea.width.name}, Size: ${trashArea.size.name}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={4}>
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
                                    readONly: true,
                                }}
                            />
                            <TextField
                                className={classes.textField}
                                label="Phone"
                                size="small"
                                defaultValue={collectJob.driver.phone}
                                InputProps={{
                                    readONly: true,
                                }}
                            />
                        </Grid>
                        <Divider />
                        <Grid item xs={12}>
                            <Typography variant="h6" style={{ marginTop: 20 }}>Assigned by</Typography>
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
                                    readONly: true,
                                }}
                            />
                            <TextField
                                className={classes.textField}
                                label="Phone"
                                size="small"
                                defaultValue={collectJob.operator.phone}
                                InputProps={{
                                    readONly: true,
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