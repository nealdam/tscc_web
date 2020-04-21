import { Card, CardContent, CardHeader, Divider, GridList, GridListTile, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Tooltip, Button, makeStyles, Grid, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import CollectJobDetailDialog from '../../organisms/dialog/CollectJobDetailDialog';
import { isToday } from '../../utils/dateUtil';
import { getCollectStatusAvatar } from '../../utils/statusUtil';
import RefreshIcon from '@material-ui/icons/Refresh';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    }
}))

function CollectJobStatus(props) {

    const classes = useStyles();

    const { collectJobs, refreshData, selectedDate, setSelectedDate } = props;

    const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
    const [selectedCollectJob, setSelectedCollectJob] = useState();

    const getCreateDate = (dateString) => {
        const d = new Date(dateString);
        let date = d.toLocaleString();

        if (isToday(d)) {
            date = d.toLocaleTimeString();
        }

        return date;
    }

    const handleOpenCollectJobDetail = (collectJob) => {
        setSelectedCollectJob(collectJob);
        setIsDetailDialogOpen(true);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
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
                    <ListItemText primary={`${trashAreas[i].streetNumber} ${trashAreas[i].street}`} />
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
            <Grid container alignItems="center" justify="space-between" direction="row">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="dense"
                        id="date-picker-inline"
                        label="Date"
                        value={selectedDate}
                        disableFuture
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
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
            {collectJobs.length > 0 ?
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
                                        <Tooltip title="Detail">
                                            <IconButton onClick={() => handleOpenCollectJobDetail(collectJob)}>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
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
                : <div>No data to show</div>
            }
            {selectedCollectJob && <CollectJobDetailDialog open={isDetailDialogOpen} setOpen={setIsDetailDialogOpen} collectJob={selectedCollectJob} />}
        </div>
    )
}

export default CollectJobStatus;