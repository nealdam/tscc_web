import { Button, ButtonGroup, TabPan, Typography, Box } from '@material-ui/core';
import React, { useState } from 'react';
import { collectTrashSteps } from '../../constants/steps';
import HorizontalLinearStepper from '../../organisms/linearStepper/HorizontalLinearStepper';
import StreetRouteTable from '../../organisms/streetRouteTable/StreetRouteTable';
import PropTypes from 'prop-types';

function createStreetRoute(street, district, city, numReq) {
    return { street, district, city, numReq };
}

function TrashCollect() {

    const [streetRoutes, setStreetRoutes] = useState([
        createStreetRoute('Thành Công', 'Tân Phú', 'Hồ Chí Minh', 3),
        createStreetRoute('Trương Vĩnh Ký', 'Tân Phú', 'Hồ Chí Minh', 10)
    ]);
    const [activeStep, setActiveStep] = useState(0);
    const steps = collectTrashSteps;

    // useEffect(() => {
    //     console.log("Fetch street route");
    //     setStreetRoutes(getStreetRoute(userData.userToken));
    //     console.log("Result: ");
    //     console.log(streetRoutes);
    // }, [])

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
                <StreetRouteTable
                    streetRoutes={streetRoutes}
                />
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