import { Box, Button, ButtonGroup, LinearProgress, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from 'react';
import { errorNotify, successNotify } from '../../constants/notistackOption';
import { collectTrashSteps } from '../../constants/steps';
import { UserContext } from '../../context/PageProvider';
import DriverTable from '../../organisms/driverTable/DriverTable';
import HorizontalLinearStepper from '../../organisms/linearStepper/HorizontalLinearStepper';
import TrashAreaTable from '../../organisms/trashAreaTable/TrashAreaTable';
import TrashCollectForm from '../../organisms/trashCollectForm/TrashCollectForm';
import { getDrivers, getTrashAreas, sendDirection } from '../../services/operatorService';
import { useHistory } from 'react-router-dom';

function TrashCollect() {
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    const userData = useContext(UserContext)
    const [activeStep, setActiveStep] = useState(0);
    const steps = collectTrashSteps;

    const [trashAreas, setTrashAreas] = useState([]);
    const [selectedTrashId, setSelectedTrashId] = useState([]);

    const [drivers, setDrivers] = useState([]);
    const [selectedDriverId, setSelectedDriverId] = useState([]);

    const history = useHistory();

    useEffect(() => {
        fetchTrashAreas();
        fetchDrivers();
    }, [])

    const fetchTrashAreas = () => {
        setIsLoading(true);
        getTrashAreas(userData.userToken)
            .then(response => {
                if (response.data.success) {
                    enqueueSnackbar("Fetch Trash Area data success", successNotify);
                    setTrashAreas(response.data.content);
                } else {
                    enqueueSnackbar(response.data.message, errorNotify);
                }
            })
            .catch(error => {
                console.log("Error during fetch Trash Area");
                console.log(error);
                enqueueSnackbar("Error during fetch Trash Area", errorNotify);
            })
            .finally(
                setIsLoading(false)
            );
    }

    const fetchDrivers = () => {
        getDrivers(userData.userToken)
            .then(response => {
                if (response.data.success) {
                    enqueueSnackbar("Fetch Drivers data success", successNotify);
                    setDrivers(response.data.content);
                } else {
                    enqueueSnackbar(response.data.message, errorNotify);
                }
            })
            .catch(error => {
                console.log("Error during fetch Drivers");
                console.log(error);
                enqueueSnackbar("Error during fetch Drivers", errorNotify);
            })
    }

    const handleFetchTrashAreas = () => {
        fetchTrashAreas();
    }

    const handleSendCollectTrash = () => {
        const driverId = selectedDriverId.shift();
        const tempTrashAreaId = selectedTrashId;

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

        selectedTrashId.forEach((id, index) => {

            let value = trashAreas.find((trash) => {
                return trash.id === id;
            })

            selectedTrash.push(value);
        })

        return selectedTrash;
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
            if (selectedTrashId.length === 0) {
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
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button disabled={activeStep === 0} onClick={handleBackStep}>Back</Button>
                <Button disabled={isNext()} onClick={handleNextStep}>Next</Button>
                {activeStep === (steps.length - 1) && <Button onClick={(e) => handleSendCollectTrash()}>Confirm</Button>
                }
            </ButtonGroup>
            <TabPanel value={activeStep} index={0}>
                {trashAreas.length > 0
                    ? <TrashAreaTable trashAreas={trashAreas} selected={selectedTrashId} setSelected={setSelectedTrashId} />
                    : isLoading && <LinearProgress />
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