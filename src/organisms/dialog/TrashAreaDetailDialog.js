import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, GridList, GridListTile, LinearProgress, makeStyles, TextField, Divider, Box, Typography, AppBar, Tabs, Tab } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/PageProvider';
import TrashAreaMap from '../../molecule/trashAreaMap/TrashAreaMap';
import { getImageAPI, cancelTrashArea } from '../../services/operatorService';
import { isToday } from '../../utils/dateUtil';
import { getTrashTypeName } from '../../utils/trashTypeUtil';

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
    const [otherImages, setOtherImages] = useState([]);

    const [tabValue, setTabValue] = useState(0);

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
        let otherImageDirs = [];

        trashArea.ltrashForms.map(trashForm => {
            trashForm.imageDirs.map(imageDir => {
                imageDirs.push(imageDir);
            })

            trashForm.unRecognizeImageDirs.map(otherImageDir => {
                otherImageDirs.push(otherImageDir);
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

        getImageAPI(userData.userToken, otherImageDirs)
            .then(responseArr => {
                let newOtherImages = [];

                responseArr.forEach(response => {
                    newOtherImages.push(response.data);
                })

                setOtherImages(newOtherImages);
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

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle>Chi tiết điểm rác</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={7} >
                        <AppBar position="static">
                            <Tabs value={tabValue} onChange={handleTabChange}>
                                <Tab label="Categorized" {...a11yProps(0)} />
                                <Tab label="Uncategorized" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>

                        <TabPanel value={tabValue} index={0} >
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
                        </TabPanel>

                        <TabPanel value={tabValue} index={1} >
                            {isImageLoading
                                ? <LinearProgress />
                                : <GridList cellHeight={160} cols={3} spacing={4} style={{ height: 550 }} >
                                    {otherImages.map((image, index) => {
                                        return (
                                            <GridListTile key={index} col={1}>
                                                <img src={image} alt={index} />
                                            </GridListTile>
                                        )
                                    })}
                                </GridList>
                            }
                        </TabPanel>

                    </Grid>
                    <Grid item xs={5}>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Địa chỉ"
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
                                label="Số yêu cầu"
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
                                label="Khối lượng (kg)"
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
                                label="Thể tích (&#13221;)"
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
                                label="Loại"
                                size="small"
                                fullWidth={true}
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={getTrashTypeName(trashArea.type.name)}
                            />
                            <TextField
                                className={classes.textField}
                                variant="outlined"
                                label="Cập nhật lần cuối"
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
                    Hủy điểm rác
                </Button>
                <Button variant="contained" color="default" onClick={handleClose}>
                    Đóng
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

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default TrashAreaDetailDialog;