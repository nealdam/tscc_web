import { Grid, Table, TableBody, TableCell, TableRow, Typography, TextField, TableHead } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function TrashCollectForm(props) {

    const { selectedTrash, selectedDriver } = props;

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Typography variant="h4">Selected Trash Area</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>Size</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Width</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedTrash.map((trash) => (
                                <TableRow key={trash.id}>
                                    <TableCell>{`${trash.streetNumber} ${trash.street}, ${trash.district}`}</TableCell>
                                    <TableCell>{trash.size}</TableCell>
                                    <TableCell>{trash.type.name}</TableCell>
                                    <TableCell>{trash.width}</TableCell>
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
                                style={{ marginTop: 20 }}
                                defaultValue={selectedDriver.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            // variant="outlined"
                            />
                            <TextField
                                label="Employee Code"
                                style={{ marginTop: 20 }}
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

