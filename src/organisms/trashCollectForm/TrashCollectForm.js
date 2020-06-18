import { Grid, Table, TableBody, TableCell, TableRow, Typography, TextField, TableHead } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { getTrashTypeGroup } from '../../utils/trashTypeUtil';
import TrashTypeGroup from '../../molecule/trashTypeGroup/TrashTypeGroup';

function TrashCollectForm(props) {

    const { selectedTrash, selectedDriver, setIsOverWeight } = props;

    const getTotalSize = () => {
        let totalSize = 0;
        setIsOverWeight(true)

        selectedTrash.forEach(trash => {
            totalSize += trash.size;
        });

        if (totalSize < selectedDriver.maxWeight) {
            setIsOverWeight(false);
        }

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
            totalTrashForm = totalTrashForm.concat(trashArea.lTrashForms);
        })

        console.log("ORGANIC")
        totalTrashForm.every(trashForm => {
            console.log("type: " + trashForm.trashType.name)
            if (trashForm.trashType.name === "ORGANIC") {
                isOrganic = true;
                return false;
            }
            return true;
        })

        console.log("RECYCLE")
        totalTrashForm.every(trashForm => {
            console.log("type: " + trashForm.trashType.name)
            if (trashForm.trashType.name === "RECYCLE") {
                isRecycle = true;
                return false;
            }
            return true;
        })

        console.log("OTHER")
        totalTrashForm.every(trashForm => {
            console.log("type: " + trashForm.trashType.name)
            if (trashForm.trashType.name === "OTHER") {
                isOther = true;
                return false;
            }
            return true;
        })

        console.log(`all type: isOr ${isOrganic} isRe ${isRecycle} isOt ${isOther}`);

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
                                <TableCell>Khối lượng (kg)</TableCell>
                                <TableCell>Thể tích (㎥)</TableCell>
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
                    {(getTotalSize() > selectedDriver.maxWeight) && <Typography variant="h3" color="secondary" ><b>Quá tải trọng xe</b></Typography>}
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

