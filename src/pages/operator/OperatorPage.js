import { makeStyles } from '@material-ui/core'
import { isToday } from 'date-fns'
import { useSnackbar } from 'notistack'
import React, { useContext, useEffect, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { errorNotify, infoNotify, successNotify } from '../../constants/notistackOption'
import { UserContext } from '../../context/PageProvider'
import OperatorDrawer from '../../organisms/drawer/OperatorDrawer'
import Header from '../../organisms/header/Header'
import { generateTrashAreas, getCollectJobByDate, getDrivers, getGenerateStatus, getTrashAreas } from '../../services/operatorService'
import CollectJobStatus from '../collectJobStatus/CollectJobStatus'
import DriverDetail from '../driverDetail/DriverDetail'
import TrashCollect from '../trashCollect/TrashCollect'

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

    const [todayCollectJobs, setTodayCollectJobs] = useState([]);

    useEffect(() => {
        fetchData();
    }, ['']);

    const fetchData = () => {
        fetchCollectJob();
        fetchTrashAreas();
        fetchGenerateStatus();
        fetchTodayCollectJob();
        fetchDrivers();

    }

    const isDriverOnDuty = (driverId) => {
        let result = false;
        console.log("--- Is Driver on duty ---");
        console.log("find driver id: " + driverId);

        todayCollectJobs.forEach(collectJob => {
            console.log("Collect job: " + collectJob.id);
            console.log("Driver id: " + collectJob.driver.id);

            if (driverId === collectJob.driver.id && collectJob.status.name === "PROCESSING") {
                result = true;
                return result;
            }
        })

        return result;
    }

    const fetchTodayCollectJob = () => {
        getCollectJobByDate(userData.userToken, new Date())
            .then(response => {
                setTodayCollectJobs(response.data.content);
            })
    }

    const fetchCollectJob = (date) => {

        let chooseDate = collectJobsDate;

        if (date) {
            chooseDate = date;
        }

        getCollectJobByDate(userData.userToken, chooseDate)
            .then(response => {
                setCollectJobs(response.data.content);
                console.log(response.data.content);
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
                    enqueueSnackbar("Error during fetch trash area", errorNotify);
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
                            fetchGenerateStatus={fetchGenerateStatus}
                            isGenerating={isGenerating}
                            lastGenerate={lastGenerate}
                            generateTrashArea={generateTrashArea}
                            isDriverOnDuty={isDriverOnDuty}
                        />
                    </Route>
                    <Route exact path={`${path}/driver`} >
                        <DriverDetail drivers={drivers} refreshData={fetchDrivers} isDriverOnDuty={isDriverOnDuty} />
                    </Route>
                </Switch>
            </main>
        </React.Fragment>
    )
}