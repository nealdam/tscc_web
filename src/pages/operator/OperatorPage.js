import { makeStyles } from '@material-ui/core'
import React, { useState, useContext, useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OperatorDrawer from '../../organisms/drawer/OperatorDrawer'
import Header from '../../organisms/header/Header'
import TrashCollect from '../trashCollect/TrashCollect'
import CollectJobStatus from '../collectJobStatus/CollectJobStatus'
import { getCollectJob, getTrashAreas, getDrivers } from '../../services/operatorService'
import { UserContext } from '../../context/PageProvider'
import { useSnackbar } from 'notistack'
import { successNotify, errorNotify } from '../../constants/notistackOption'
import DriverTable from '../../organisms/driverTable/DriverTable'

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
    },
}))

export default function OperatorPage() {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    let { path } = useRouteMatch();

    const userData = useContext(UserContext);

    const [collectJobs, setCollectJobs] = useState([]);
    const [trashAreas, setTrashAreas] = useState([]);
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetchData();
    }, ['']);

    const fetchData = () => {
        fetchCollectJob();
        fetchTrashAreas();
        fetchDrivers();
    }

    const fetchCollectJob = () => {
        getCollectJob(userData.userToken)
            .then(response => {
                setCollectJobs(response.data);
                enqueueSnackbar("Fetch collect job success", successNotify);
            })
            .catch(error => {
                console.log("Error during fetch collect job");
                console.log(error);
                enqueueSnackbar("Error during fetch collect job", errorNotify);
            })
    }

    const fetchTrashAreas = () => {
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
            });
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


    return (
        <React.Fragment>
            <Header />
            <OperatorDrawer />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path={path} >
                        <CollectJobStatus collectJobs={collectJobs} />
                    </Route>
                    <Route path={`${path}/collect`} >
                        <TrashCollect trashAreas={trashAreas} drivers={drivers} fetchData={fetchData} />
                    </Route>
                    <Route exact path={`${path}/driver`} >
                        <DriverTable drivers={drivers} selected={''} setSelected={''} isForSelect={false} />
                    </Route>
                </Switch>
            </main>
        </React.Fragment>
    )
}