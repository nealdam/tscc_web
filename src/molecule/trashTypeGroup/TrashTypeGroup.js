import React, { useState } from 'react'
import EcoIcon from '@material-ui/icons/Eco';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { Grid, Icon, Tooltip } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { loadCSS } from 'fg-loadcss'

function TrashTypeGroup(props) {

    React.useEffect(() => {
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    const { isOrganic, isRecycle, isOther } = props;

    const OrganicSymbol = () => {

        if (isOrganic) {
            return (
                <Tooltip title="Hữu cơ">
                    <EcoIcon style={{ color: green[500] }} />
                </Tooltip>
            )
        } else {
            return (
                <Tooltip title="Hữu cơ">
                    <EcoIcon color="disabled" />
                </Tooltip>
            )
        }
    }

    const RecycleSymbol = () => {
        if (isRecycle) {
            return (
                <Tooltip title="Tái chế">
                    <Icon className="fa fa-recycle" fontSize="small" style={{ color: green[500] }} />
                </Tooltip>
            )
        } else {
            return (
                <Tooltip title="Tái chế">
                    <Icon className="fa fa-recycle" fontSize="small" color="disabled" />
                </Tooltip>
            )
        }
    }

    const OtherSymbol = () => {
        if (isOther) {
            return (
                <Tooltip title="Loại khác">
                    <Icon className="fa fa-dumpster" fontSize="small" style={{ color: green[500] }} />
                </Tooltip>
            )
        } else {
            return (
                <Tooltip title="Loại khác">
                    <Icon className="fa fa-dumpster" fontSize="small" color="disabled" />
                </Tooltip>
            )
        }
    }


    return (
        <Grid container justify="center" spacing="1">
            <Grid item>
                <OrganicSymbol />
            </Grid>
            <Grid item>
                <RecycleSymbol />
            </Grid>
            <Grid item>
                <OtherSymbol />
            </Grid>
        </Grid>
    )
}

export default TrashTypeGroup