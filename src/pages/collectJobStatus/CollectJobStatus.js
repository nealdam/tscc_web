import { Button, Card, CardContent, CardHeader, Divider, GridList, GridListTile, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { errorNotify, successNotify } from '../../constants/notistackOption';
import { UserContext } from '../../context/PageProvider';
import CollectJobDetailDialog from '../../organisms/dialog/CollectJobDetailDialog';
import { getCollectJob } from '../../services/operatorService';
import { isToday } from '../../utils/dateUtil';
import { getCollectStatusAvatar } from '../../utils/statusUtil';

function CollectJobStatus() {

    const userData = useContext(UserContext);

    const { enqueueSnackbar } = useSnackbar();

    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);

    const [selectedCollectJob, setSelectedCollectJob] = useState();

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

    const FetchButton = () => {
        if (collectJobs.length === 0) {
            return <Button onClick={fetchCollectJob}>Fetch collect job</Button>
        }
        return <div></div>
    }

    const handleOpenCollectJobDetail = (collectJob) => {
        setSelectedCollectJob(collectJob);
        setIsDetailDialogOpen(true);
    }

    const PreViewTrashAreas = (props) => {

        const trashAreas = props.trashAreas;

        const items = [];
        let maxLength = 3;

        if (trashAreas.length < maxLength) {
            maxLength = trashAreas.length;
        }

        for (var i = 0; i < maxLength; i++) {
            items.push(
                <ListItem key={i}>
                    <ListItemAvatar>
                        {getCollectStatusAvatar(trashAreas[i].status.name)}
                    </ListItemAvatar>
                    <ListItemText primary={trashAreas[i].street} />
                </ListItem>
            )
        }

        if (trashAreas.length > 3) {
            items.push(
                <ListItem key={4} >
                    <ListItemIcon>
                        <MoreIcon />
                    </ListItemIcon>
                    <ListItemText primary="click detail for more" />
                </ListItem>
            )
        }

        return (
            <List>
                {items}
            </List>
        )
    }

    return (
        <div>
            <FetchButton />
            <GridList cellHeight={340} cols={3} spacing={10}>
                {collectJobs.map((collectJob) => (
                    <GridListTile key={collectJob.id} cols={1}>
                        <Card
                            variant="outlined"
                            style={{ height: "100%" }}
                        >
                            <CardHeader
                                avatar={getCollectStatusAvatar(collectJob.status.name)}
                                action={
                                    <IconButton onClick={() => handleOpenCollectJobDetail(collectJob)}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                                title={collectJob.driver ? `Driver: ${collectJob.driver.name}` : "Driver Name"}
                                subheader={collectJob.createAt && `Assign at: ${getCreateDate(collectJob.createAt)}`}
                            />
                            <Divider />
                            <CardContent>
                                <PreViewTrashAreas trashAreas={collectJob.trashAreas} />
                            </CardContent>
                        </Card>
                    </GridListTile>
                ))}
            </GridList>
            {selectedCollectJob && <CollectJobDetailDialog open={isDetailDialogOpen} setOpen={setIsDetailDialogOpen} collectJob={selectedCollectJob} />}
        </div>
    )
}

export default CollectJobStatus;