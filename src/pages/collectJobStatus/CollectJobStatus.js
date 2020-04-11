import React, { useState, useContext, useEffect } from 'react'
import { getCollectJob } from '../../services/operatorService';
import { UserContext } from '../../context/PageProvider';
import { useSnackbar } from 'notistack';
import { successNotify, errorNotify } from '../../constants/notistackOption';
import { Card, CardContent, Typography, makeStyles, GridList, CardHeader, Avatar, IconButton, Divider, List, GridListTile } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { isToday } from '../../utils/dateUtil';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles({
    root: {
        // minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function CollectJobStatus() {

    const userData = useContext(UserContext);
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [collectJobs, setCollectJobs] = useState([]);

    useEffect(() => {
        fetchCollectJob();
    }, [])

    const getCreateDate = (dateString) => {
        const d = new Date(dateString);
        let date = d.toLocaleString();

        if (isToday(d)) {
            date = d.toLocaleTimeString();
        }

        return date;
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

    const getStatus = (status) => {
        if (status === 'PROCESSING') {
            return (
                <Avatar style={{ backgroundColor: '#ffa000' }}>
                    <DepartureBoardIcon />
                </Avatar>
            )
        }

        return (
            <Avatar style={{ backgroundColor: '#43a047' }}>
                <DoneIcon />
            </Avatar>
        )
    }

    return (
        <div>
            <GridList cellHeight={300} cols={3} spacing={10}>
                {collectJobs.map((collectJob) => (
                    <GridListTile key={collectJob.id} cols={1}>
                        <Card
                            variant="outlined"
                            style={{ height: "100%" }}
                        >
                            <CardHeader
                                avatar={getStatus(collectJob.status.name)}
                                title={collectJob.driver ? `Driver: ${collectJob.driver.name}` : "Driver Name"}
                                subheader={collectJob.createAt && `Assign at: ${getCreateDate(collectJob.createAt)}`}
                            />
                            <Divider />
                            <CardContent>
                                <List>

                                </List>
                            </CardContent>
                        </Card>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    )
}

export default CollectJobStatus;