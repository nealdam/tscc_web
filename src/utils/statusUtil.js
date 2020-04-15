import React from 'react'
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { Avatar } from "@material-ui/core"

export function getCollectStatusAvatar(status) {
    if (status === 'PROCESSING') {
        return (
            <Avatar style={{ backgroundColor: '#ffa000' }}>
                <DepartureBoardIcon />
            </Avatar>
        )
    } else if (status === 'DONE') {
        return (
            <Avatar style={{ backgroundColor: '#43a047' }}>
                <DoneIcon />
            </Avatar>
        )
    } else {
        return (
            <Avatar style={{ backgroundColor: '#F34636' }}>
                <CloseIcon />
            </Avatar>
        )
    }


}