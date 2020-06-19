import React, { useState } from 'react'
import { Dialog, DialogActions, Button, DialogTitle, DialogContent, FormGroup, FormControlLabel, Checkbox, DialogContentText, TextField, Divider } from '@material-ui/core';

export default function UpdateTrashAreaDialog(props) {
    const {
        open,
        setOpen,
        isOrganic,
        setIsOrganic,
        isRecycle,
        setIsRecycle,
        isOther,
        setIsOther,
        size,
        setSize,
        width,
        setWidth,
        handleUpdate
    } = props;

    const handleClose = () => {
        setOpen(false);
    };

    const toggleOrganic = () => {
        setIsOrganic(!isOrganic)
    }

    const toggleRecycle = () => {
        setIsRecycle(!isRecycle)
    }

    const toggleOther = () => {
        setIsOther(!isOther)
    }

    const handleChangeSize = (value) => {
        setSize(value)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Cập nhật điểm rác</DialogTitle>
            <Divider />
            <DialogContent>
                {/* <DialogContentText>Loại rác</DialogContentText>
                <FormGroup row>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isOrganic}
                                onChange={toggleOrganic}
                                name="Hữu cơ"
                                color="primary"
                            />
                        }
                        label="Hữu cơ"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isRecycle}
                                onChange={toggleRecycle}
                                name="Tái chế"
                                color="primary"
                            />
                        }
                        label="Tái chế"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isOther}
                                onChange={toggleOther}
                                name="Loại khác"
                                color="primary"
                            />
                        }
                        label="Loại khác"
                    />
                </FormGroup> */}
                <FormGroup>
                    <TextField
                        label="Khối lượng (kg)"
                        value={size}
                        margin="normal"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 3000 } }}
                        onChange={e => setSize(e.target.value)} />
                    <TextField
                        label="Thể tích (㎥)"
                        value={width}
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 3000 } }}
                        onChange={e => setWidth(e.target.value)} />
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Đóng
            </Button>
                <Button onClick={handleUpdate} color="primary" autoFocus>
                    Cập nhật
            </Button>
            </DialogActions>
        </Dialog>
    )
}