import React from 'react'
import { Dialog, DialogTitle, DialogContentText, DialogActions, Button, DialogContent } from '@material-ui/core';

export default function ConfirmDialog(props) {
    const { open, setOpen, text, handleConfirm } = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>Xác nhận</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Hủy
                </Button>
                <Button onClick={handleConfirm} color="primary" autoFocus>
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}