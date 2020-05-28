import React from 'react'
import DriverTable from '../../organisms/driverTable/DriverTable'
import { Grid, Button, makeStyles } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1)
    }
}))

const DriverDetail = (props) => {

    const classes = useStyles();

    const { drivers, refreshData, isDriverOnDuty } = props;

    return (
        <div>
            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                <Button
                    variant="contained"
                    color="inherit"
                    className={classes.button}
                    startIcon={<RefreshIcon />}
                    onClick={() => { refreshData() }}
                >
                    Refresh
                </Button>
            </Grid>
            {drivers
                ? <DriverTable drivers={drivers} selected={''} setSelected={''} isForSelect={false} isDriverOnDuty={isDriverOnDuty} />
                : <div></div>}
        </div>
    )
}

export default DriverDetail