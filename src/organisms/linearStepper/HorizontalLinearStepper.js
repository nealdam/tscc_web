import { Step, StepLabel, Stepper } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function HorizontalLinearStepper(props) {
    const { steps, activeStep } = props;

    return (
        <div>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </div>
    );
}

HorizontalLinearStepper.propTypes = {
    steps: PropTypes.array.isRequired,
    activeStep: PropTypes.number.isRequired,
}

export default HorizontalLinearStepper;