import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, GridList, GridListTile, LinearProgress, makeStyles, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/PageProvider';
import TrashAreaMap from '../../molecule/trashAreaMap/TrashAreaMap';
import { getImageAPI, cancelTrashArea } from '../../services/operatorService';
import { isToday } from '../../utils/dateUtil';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(2),
    },
    gridList: {
        width: "100%",
        height: 450,
    },
    map: {
        marginTop: theme.spacing(2)
    }
}))

function TrashAreaDetailDialog(props) {

    const classes = useStyles();

    const userData = useContext(UserContext);

    const [isImageLoading, setIsImageLoading] = useState(false);

    const [images, setImages] = useState([]);
    const { open, setOpen, trashArea, handleCancelTrashArea } = props;

    useEffect(() => {
        fetchImages();
    }, [])

    // const handleCancelTrashArea = (id) => {
    //     cancelTrashArea(userData.userToken, id)
    //         .then(response => {
    //             if (response.data.success) {

    //             }
    //         })
    //         .catch(error => {
    //             console.log("Error during cancel trash are");
    //             console.log(error);
    //         });
    // }

    const handleClose = () => {
        setOpen(false);
    }

    const fetchImages = () => {
        console.log("Fetch image");
        setIsImageLoading(true);

        let imageDirs = [];

        trashArea.ltrashForms.map(trashForm => {
            trashForm.imageDirs.map(imageDir => {
                imageDirs.push(imageDir);
            })
        })

        getImageAPI(userData.userToken, imageDirs)
            .then(responseArr => {
                let newImages = [];

                responseArr.forEach(response => {
                    newImages.push(response.data);
                })

                setImages(newImages);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setIsImageLoading(false);
            });
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
            <DialogTitle>Trash Area Detail</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={7} >
                        {isImageLoading
                            ? <LinearProgress />
                            : <GridList cellHeight={160} cols={3} spacing={4} style={{ height: 550 }} >
                                {images.map((image, index) => {
                                    return (
                                        <GridListTile key={index} col={1}>
                                            <img src={image} alt={index} />
                                        </GridListTile>
                                    )
                                })}
                            </GridList>
                        }

                    </Grid>
                    <Grid item xs={5}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Address"
                                size="small"
                                fullWidth={true}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={`${trashArea.streetNumber} ${trashArea.street}, ${trashArea.district}, ${trashArea.city}`}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Number of request"
                                size="small"
                                fullWidth={true}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={trashArea.numberOfRequest}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Size (kg)"
                                size="small"
                                fullWidth={true}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={trashArea.size}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Width (&#13221;)"
                                size="small"
                                fullWidth={true}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={trashArea.width}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Type"
                                size="small"
                                fullWidth={true}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={trashArea.type.name}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Last update"
                                size="small"
                                fullWidth={true}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={dateOfString(trashArea.createAt)}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: 5 }}>
                            <TrashAreaMap
                                className={classes.map}
                                latitude={trashArea.latitude}
                                longitude={trashArea.longitude}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCancelTrashArea(trashArea.id)}
                >
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