import { Box, Button, ButtonGroup, Typography, Grid, makeStyles } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { errorNotify, successNotify } from '../../constants/notistackOption';
import { collectTrashSteps } from '../../constants/steps';
import { UserContext } from '../../context/PageProvider';
import DriverTable from '../../organisms/driverTable/DriverTable';
import HorizontalLinearStepper from '../../organisms/linearStepper/HorizontalLinearStepper';
import TrashAreaTable from '../../organisms/trashAreaTable/TrashAreaTable';
import TrashCollectForm from '../../organisms/trashCollectForm/TrashCollectForm';
import { sendDirection, cancelTrashArea } from '../../services/operatorService';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1)
    }
}))

function TrashCollect(props) {
    const classes = useStyles();

    const userData = useContext(UserContext)

    const {
        trashAreas,
        drivers,
        fetchData,
        fetchTrashAreas,
        fetchGenerateStatus,
        isGenerating,
        lastGenerate,
        generateTrashArea
    } = props;

    const { enqueueSnackbar } = useSnackbar();

    const [activeStep, setActiveStep] = useState(0);
    const steps = collectTrashSteps;

    const [selectedTrashIds, setSelectedTrashIds] = useState([]);
    const [selectedDriverId, setSelectedDriverId] = useState([]);

    const [isTrashAreaDetailDialogOpen, setIsTrashAreaDetailDialogOpen] = useState(false);
    const [trashAreaDetail, setTrashAreaDetail] = useState();

    const history = useHistory();

    const handleRefresh = () => {
        fetchTrashAreas();
        fetchGenerateStatus();
    }

    const handleSendCollectTrash = () => {
        const driverId = selectedDriverId.shift();
        const tempTrashAreaId = selectedTrashIds;

        const body = { driverId, tempTrashAreaId };

        sendDirection(userData.userToken, body)
            .then(response => {
                if (response.data.success) {
                    enqueueSnackbar("Send direction success", successNotify);
                } else {
                    enqueueSnackbar("Fail to send direction", errorNotify);
                }
            })
            .catch(error => {
                console.log("Error during send direction");
                console.log(error);
                enqueueSnackbar("Error during send direction", errorNotify);
            })
            .finally(() => {
                history.push("/operator");
                fetchData();
            })
    }

    const handleNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBackStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const getSelectedTrashList = () => {
        let selectedTrash = [];

        selectedTrashIds.forEach((id, index) => {

            let value = trashAreas.find((trash) => {
                return trash.id === id;
            })

            selectedTrash.push(value);
        })

        return selectedTrash;
    }

    const handleCancelTrashArea = (id) => {
        cancelTrashArea(userData.userToken, id)
            .then(response => {
                if (response.data.success) {
                    enqueueSnackbar("Cancel Trash Area success", successNotify);
                } else {
                    enqueueSnackbar("Error during cancel Trash Area", errorNotify);
                }
            })

        fetchTrashAreas();
    }

    const getSelectedDriver = () => {
        let selectedDriver = null;

        selectedDriver = drivers.find((driver) => {
            return driver.id === selectedDriverId[0];
        })

        return selectedDriver;
    }

    const isNext = () => {
        if (activeStep === 0) {
            if (selectedTrashIds.length === 0) {
                return true;
            } else {
                return false;
            }
        } else if (activeStep === 1) {
            if (selectedDriverId.length === 0) {
                return true;
            } else {
                return false;
            }
        } else if (activeStep === (steps.length - 1)) {
            return true;
        }

        return true;
    }

    return (
        <div>
            <HorizontalLinearStepper
                steps={steps}
                activeStep={activeStep}
            />
            <Grid container justify="space-between" alignItems="center">
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button disabled={activeStep === 0} onClick={handleBackStep}>Back</Button>
                    <Button disabled={isNext()} onClick={handleNextStep}>Next</Button>
                    {activeStep === (steps.length - 1) && <Button onClick={(e) => handleSendCollectTrash()}>Confirm</Button>
                    }
                </ButtonGroup>
                <Typography>
                    Last generate: {lastGenerate}
                </Typography>

                {isGenerating
                    ? <Button
                        variant="contained"
                        color="inherit"
                        className={classes.button}
                        startIcon={<RefreshIcon />}
                        disabled
                    >
                        Generating
                    </Button>
                    : <Button
                        variant="contained"
                        color="inherit"
                        className={classes.button}
                        startIcon={<RefreshIcon />}
                        onClick={() => generateTrashArea()}
                    >
                        Generate Trash Area
                    </Button>
                }
                <Button
                    variant="contained"
                    color="inherit"
                    className={classes.button}
                    startIcon={<RefreshIcon />}
                    onClick={() => { handleRefresh() }}
                >
                    Refresh
                </Button>
            </Grid>
            <TabPanel value={activeStep} index={0}>
                {trashAreas.length > 0
                    ? <TrashAreaTable isCheckBox trashAreas={trashAreas} selected={selectedTrashIds} setSelected={setSelectedTrashIds} />
                    : <div>Don't have any trash to show</div>
                }

            </TabPanel>
            <TabPanel value={activeStep} index={1}>
                <DriverTable drivers={drivers} selected={selectedDriverId} setSelected={setSelectedDriverId} />
            </TabPanel>
            <TabPanel value={activeStep} index={2}>
                <TrashCollectForm selectedTrash={getSelectedTrashList()} selectedDriver={getSelectedDriver()} />
            </TabPanel>
        </div>
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default TrashCollect;