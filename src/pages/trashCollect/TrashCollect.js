import { Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react';
import { collectTrashSteps } from '../../constants/steps';
import HorizontalLinearStepper from '../../organisms/linearStepper/HorizontalLinearStepper';
import StreetRouteTable from '../../organisms/streetRouteTable/StreetRouteTable';



function createStreetRoute(street, district, city, numberOfRequest) {
    return { street, district, city, numberOfRequest };
}

export default function TrashCollect() {

    const [streetRoutes, setStreetRoutes] = useState([createStreetRoute('Thành Công', 'Tân Phú', 'Hồ Chí Minh', 3)]);

    // useEffect(() => {
    //     console.log("Fetch street route");
    //     setStreetRoutes(getStreetRoute(userData.userToken));
    //     console.log("Result: ");
    //     console.log(streetRoutes);
    // }, [])

    const [activeStep, setActiveStep] = useState(0);
    const steps = collectTrashSteps;

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
            <StreetRouteTable
                streetRoutes={streetRoutes}
            />
        </div>
    );
}