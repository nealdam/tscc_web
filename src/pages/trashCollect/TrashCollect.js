import { Button, ButtonGroup, Typography, Box, LinearProgress } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { collectTrashSteps } from '../../constants/steps';
import HorizontalLinearStepper from '../../organisms/linearStepper/HorizontalLinearStepper';
import StreetRouteTable from '../../organisms/streetRouteTable/StreetRouteTable';
import PropTypes from 'prop-types';
import { getStreetRoute } from '../../services/operatorService';
import { UserContext } from '../../context/PageProvider';
import { useSnackbar } from 'notistack';
import { successNotify, errorNotify } from '../../constants/notistackOption';

function TrashCollect() {
    const { enqueueSnackbar } = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);

    const userData = useContext(UserContext)
    const [streetRoutes, setStreetRoutes] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const steps = collectTrashSteps;


    useEffect(() => {
        console.log("Fetch street route");
        setIsLoading(true);
        // setStreetRoutes(getStreetRoute(userData.userToken));
        getStreetRoute(userData.userToken)
            .then(response => {
                setIsLoading(false);

                if (response.data.success) {
                    enqueueSnackbar("Fetch street route data success", successNotify);
                    setStreetRoutes(response.data.content);
                } else {
                    enqueueSnackbar(response.data.message, errorNotify);
                }
            })
            .catch(error => {
                setIsLoading(false);
                console.log("Error during fetch street route");
                console.log(error);
                enqueueSnackbar("Error during fetch street route", errorNotify);
            })
    }, [])

    const handleNextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBackStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    return (
        <div>
            <HorizontalLinearStepper
                steps={steps}
                activeStep={activeStep}
            />
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button disabled={activeStep === 0} onClick={handleBackStep}>Back</Button>
                <Button disabled={activeStep === (steps.length - 1)} onClick={handleNextStep}>Next</Button>
            </ButtonGroup>
            <TabPanel value={activeStep} index={0}>
                {streetRoutes.length > 0
                    ? <StreetRouteTable streetRoutes={streetRoutes} />
                    : isLoading
                        ? <LinearProgress />
                        : <div>No Trash Area to process</div>
                }

            </TabPanel>
            <TabPanel value={activeStep} index={1}>
                Driver table
            </TabPanel>
            <TabPanel value={activeStep} index={2}>
                Confirm
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