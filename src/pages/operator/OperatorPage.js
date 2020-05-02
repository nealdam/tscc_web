import { makeStyles } from '@material-ui/core'
import React, { useState, useContext, useEffect } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OperatorDrawer from '../../organisms/drawer/OperatorDrawer'
import Header from '../../organisms/header/Header'
import TrashCollect from '../trashCollect/TrashCollect'
import CollectJobStatus from '../collectJobStatus/CollectJobStatus'
import { getCollectJobByDate, getTrashAreas, getDrivers, getGenerateStatus, generateTrashAreas } from '../../services/operatorService'
import { UserContext } from '../../context/PageProvider'
import { useSnackbar } from 'notistack'
import { successNotify, errorNotify, infoNotify } from '../../constants/notistackOption'
import DriverTable from '../../organisms/driverTable/DriverTable'
import DriverDetail from '../driverDetail/DriverDetail'
import { getDayTimeText } from '../../utils/dateUtil'
import { isToday } from 'date-fns'

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
    const [isGenerating, setIsGenerating] = useState(false);
    const [lastGenerate, setLastGenerate] = useState("Not yet");
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        fetchData();
    }, ['']);

    const fetchData = () => {
        fetchCollectJob();
        fetchTrashAreas();
        fetchGenerateStatus();
        fetchDrivers();
    }

    const fetchCollectJob = (date) => {

        let chooseDate = collectJobsDate;

        if (date) {
            chooseDate = date;
        }

        getCollectJobByDate(userData.userToken, chooseDate)
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

    const generateTrashArea = () => {
        generateTrashAreas(userData.userToken)
            .then(response => {
                enqueueSnackbar("Start generating Trash Areas", infoNotify);
                fetchGenerateStatus();
            })
            .catch(error => {
                console.log("Error during generate Trash Areas");
                console.log(error);
            })
    }

    const fetchGenerateStatus = () => {
        getGenerateStatus(userData.userToken)
            .then(response => {

                const date = new Date(response.data.lastGenerate);
                let dateString = date.toLocaleString();

                if (isToday(date)) {
                    dateString = date.toLocaleTimeString();
                }

                setIsGenerating(response.data.generating);
                setLastGenerate(dateString);
            })
            .catch(error => {
                console.log("Error during fetch generate status");
                console.log(error);
            })
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

    const handleJobStatusDateChange = (date) => {
        setCollectJobsDate(date);
        fetchCollectJob(date);
    }


    return (
        <React.Fragment>
            <Header />
            <OperatorDrawer />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path={path} >
                        <CollectJobStatus
                            collectJobs={collectJobs}
                            selectedDate={collectJobsDate}
                            setSelectedDate={handleJobStatusDateChange}
                            refreshData={fetchCollectJob}
                        />
                    </Route>
                    <Route path={`${path}/collect`} >
                        <TrashCollect
                            trashAreas={trashAreas}
                            drivers={drivers}
                            fetchData={fetchData}
                            fetchTrashAreas={fetchTrashAreas}
                            isGenerating={isGenerating}
                            lastGenerate={lastGenerate}
                            generateTrashArea={generateTrashArea}
                        />
                    </Route>
                    <Route exact path={`${path}/driver`} >
                        <DriverDetail drivers={drivers} refreshData={fetchDrivers} />
                    </Route>
                </Switch>
            </main>
        </React.Fragment>
    )
}