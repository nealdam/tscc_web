import React from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button, makeStyles, GridList } from '@material-ui/core';
import PropTypes from 'prop-types';
import { isToday } from '../../utils/dateUtil';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(2),
    },
    gridList: {
        width: "100%",
        height: 450,
    }
}))

function TrashAreaDetailDialog(props) {

    const classes = useStyles();

    const { open, setOpen, trashArea } = props;

    const handleClose = () => {
        setOpen(false);
    }

    const dateOfString = (dateString) => {
        let d = new Date(dateString);
        if (isToday(d)) {
            return d.toLocaleTimeString();
        }
        return d.toLocaleString();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'md'}
        >
            {console.log(trashArea.size)}
            <DialogTitle>Trash Area Detail</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={7}>
                        <GridList cellHeight={160} cols={3} spacing={4}>

                        </GridList>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Address"
                                size="small"
                                fullWidth={true}
                                value={`${trashArea.street}, ${trashArea.district}, ${trashArea.city}`}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Number of request"
                                size="small"
                                fullWidth={true}
                                value={trashArea.numberOfRequest}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Size"
                                size="small"
                                fullWidth={true}
                                value={trashArea.size.name}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Width"
                                size="small"
                                fullWidth={true}
                                value={trashArea.width.name}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Type"
                                size="small"
                                fullWidth={true}
                                value={trashArea.type.name}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Last update"
                                size="small"
                                fullWidth={true}
                                value={dateOfString(trashArea.createAt)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary">
                    Cancel Trash Area
                </Button>
                <Button variant="contained" color="default" onClick={handleClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

TrashAreaDetailDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    trashArea: PropTypes.object.isRequired,
}

export default TrashAreaDetailDialog;