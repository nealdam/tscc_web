import { Grid, Table, TableBody, TableCell, TableRow, Typography, TextField, TableHead } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function TrashCollectForm(props) {

    const { selectedTrash, selectedDriver } = props;

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs>
                    <Typography variant="h4">Điểm rác được chọn</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Địa chỉ</TableCell>
                                <TableCell>Khối lượng</TableCell>
                                <TableCell>Thể tích</TableCell>
                                <TableCell>Loại</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedTrash.map((trash) => (
                                <TableRow key={trash.id}>
                                    <TableCell>{`${trash.streetNumber} ${trash.street}, ${trash.district}`}</TableCell>
                                    <TableCell>{trash.size}</TableCell>
                                    <TableCell>{trash.width}</TableCell>
                                    <TableCell>{trash.type.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h4">Tài xế được chọn</Typography>
                    {selectedDriver && (
                        <div>
                            <TextField
                                label="Tên"
                                style={{ marginTop: 20 }}
                                defaultValue={selectedDriver.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            // variant="outlined"
                            />
                            <TextField
                                label="MS nhân viên"
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

