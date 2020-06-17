import { Grid, Table, TableBody, TableCell, TableRow, Typography, TextField, TableHead } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { getTrashTypeGroup } from '../../utils/trashTypeUtil';
import TrashTypeGroup from '../../molecule/trashTypeGroup/TrashTypeGroup';

function TrashCollectForm(props) {

    const { selectedTrash, selectedDriver } = props;

    const getTotalSize = () => {
        let totalSize = 0;

        selectedTrash.forEach(trash => {
            totalSize += trash.size;
        });

        return totalSize.toFixed(2);
    }

    const getTotalWidth = () => {
        let totalWidth = 0;

        selectedTrash.forEach(trash => {
            totalWidth += trash.width;
        });

        return totalWidth.toFixed(2);
    }

    const getAllType = () => {
        var totalTrashForm = [];
        let isOrganic = false;
        let isRecycle = false;
        let isOther = false;


        selectedTrash.forEach(trashArea => {
            totalTrashForm.concat(trashArea.lTrashForm);
        })

        isOrganic = totalTrashForm.map(trashForm => {
            if (trashForm.type.name === "ORGANIC") {
                return true;
            }
            return false;
        })

        isRecycle = totalTrashForm.map(trashForm => {
            if (trashForm.type.name === "RECYCLE") {
                return true;
            }
            return false;
        })

        isOther = totalTrashForm.map(trashForm => {
            if (trashForm.type.name === "OTHER") {
                return true;
            }
            return false;
        })

        return (
            <TrashTypeGroup
                isOrganic={isOrganic}
                isRecycle={isRecycle}
                isOther={isOther}
            />
        )
    }

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
                                <TableCell align="center">Loại</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedTrash.map((trash) => (
                                <TableRow key={trash.id}>
                                    <TableCell>{`${trash.streetNumber} ${trash.street}, ${trash.district}`}</TableCell>
                                    <TableCell>{trash.size}</TableCell>
                                    <TableCell>{trash.width}</TableCell>
                                    <TableCell>{getTrashTypeGroup(trash)}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell align="right"><b>Tổng cộng</b></TableCell>
                                <TableCell>{getTotalSize()}</TableCell>
                                <TableCell>{getTotalWidth()}</TableCell>
                                <TableCell>{getAllType()}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h4">Tài xế được chọn</Typography>
                    {selectedDriver && (
                        <div>
                            <TextField
                                label="Tên"
                                style={{ marginTop: 20 }}
                                fullWidth
                                defaultValue={selectedDriver.name}
                                InputProps={{
                                    readOnly: true,
                                }}
                            // variant="outlined"
                            />
                            <TextField
                                label="MS nhân viên"
                                style={{ marginTop: 20 }}
                                fullWidth
                                defaultValue={selectedDriver.employeeCode}
                                InputProps={{
                                    readOnly: true,
                                }}
                            // variant="outlined"
                            />
                            <TextField
                                label="Tải trọng"
                                style={{ marginTop: 20 }}
                                fullWidth
                                defaultValue={selectedDriver.maxWeight}
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

