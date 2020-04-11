import { Grid, Table, TableBody, TableCell, TableRow, Typography, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

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
                                    <TableCell>{trash.size.name}</TableCell>
                                    <TableCell>{trash.width.name}</TableCell>
                                    <TableCell>{trash.type.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h4">Selected Driver</Typography>
                    {selectedDriver && (
                        <div>
                            <TextField
                                label="Driver name"
                                defaultValue={selectedDriver.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            // variant="outlined"
                            />
                            <TextField
                                label="Employee Code"
                                defaultValue={selectedDriver.employeeCode}
                                InputProps={{
                                    readOnly: true,
                                }}
                            // variant="outlined"
                            />
                        </div>)
                    }
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

