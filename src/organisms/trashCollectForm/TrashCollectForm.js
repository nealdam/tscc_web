import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableRow, Grid, TableHead, Typography } from '@material-ui/core';

function TrashCollectForm(props) {

    const { selectedTrash, selectedDriver } = props;

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Table>
                        <Typography variant="h4">Selected Trash Area</Typography>
                        <TableBody>
                            {selectedTrash.map((trash) => (
                                <TableRow key={trash.id}>
                                    <TableCell>{trash.street}</TableCell>
                                    <TableCell>{trash.district}</TableCell>
                                    <TableCell>{trash.city}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h4">Selected Driver</Typography>
                    <Typography style={{ marginTop: 12 }}>{selectedDriver.name}</Typography>
                    <Typography>{selectedDriver.employeeCode}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

TrashCollectForm.propTypes = {
    selectedTrash: PropTypes.array.isRequired,
    selectedDriver: PropTypes.object.isRequired,
}

export default TrashCollectForm;

