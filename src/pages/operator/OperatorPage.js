import { makeStyles } from '@material-ui/core'
import React, { useState, useContext, useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OperatorDrawer from '../../organisms/drawer/OperatorDrawer'
import Header from '../../organisms/header/Header'
import TrashCollect from '../trashCollect/TrashCollect'
import CollectJobStatus from '../collectJobStatus/CollectJobStatus'
import { getCollectJobByDate, getTrashAreas, getDrivers } from '../../services/operatorService'
import { UserContext } from '../../context/PageProvider'
import { useSnackbar } from 'notistack'
import { successNotify, errorNotify } from '../../constants/notistackOption'
import DriverTable from '../../organisms/driverTable/DriverTable'
import DriverDetail from '../driverDetail/DriverDetail'

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
    const [collectJobsDate, setCollectJobsDate] = useState(new Date());
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

        console.log(collectJobsDate.toISOString());

        getCollectJobByDate(userData.userToken, collectJobsDate)
            .then(response => {
                setCollectJobs(response.data.content);
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
                        <CollectJobStatus collectJobs={collectJobs} selectedDate={collectJobsDate} setSelectedDate={setCollectJobsDate} refreshData={fetchCollectJob} />
                    </Route>
                    <Route path={`${path}/collect`} >
                        <TrashCollect trashAreas={trashAreas} drivers={drivers} fetchData={fetchData} fetchTrashAreas={fetchTrashAreas} />
                    </Route>
                    <Route exact path={`${path}/driver`} >
                        <DriverDetail drivers={drivers} refreshData={fetchDrivers} />
                    </Route>
                </Switch>
            </main>
        </React.Fragment>
    )
}