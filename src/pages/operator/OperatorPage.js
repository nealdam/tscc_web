import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import OperatorDrawer from '../../organisms/drawer/OperatorDrawer'
import Header from '../../organisms/header/Header'
import TrashCollect from './trashCollect/TrashCollect'

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
    },
}))

export default function OperatorPage() {

    const classes = useStyles();

    let { path } = useRouteMatch();


    return (
        <React.Fragment>
            <Header />
            <OperatorDrawer />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path={path} >
                        <div>Operator home page</div>
                    </Route>
                    <Route path={`${path}/collect`} >
                        <TrashCollect />
                    </Route>
                    <Route exact path={`${path}/driver`} >
                        <div>Operator driver page</div>
                    </Route>
                    <Route exact path={`${path}/notification`} >
                        <div>Operator notification page</div>
                    </Route>
                </Switch>
            </main>
        </React.Fragment>
    )
}