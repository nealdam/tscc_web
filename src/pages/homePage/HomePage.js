import React, { useContext, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { useHistory, Redirect } from 'react-router-dom';
import { PageContext, UserContext } from '../../context/PageProvider';
import { Backdrop, CircularProgress } from '@material-ui/core';

export default function HomePage() {

    const userData = useContext(UserContext);

    const history = useHistory();

    auth.onAuthStateChanged(userAuth => {
        if (userAuth) {
            console.log("obs User logged in " + userAuth.email);
            userAuth.getIdToken().then(token => {
                console.log("Token setted");
                userData.setToken(token);
                history.push("/operator");
            })
            userData.setEmail(userAuth.email);
            // const history = useHistory();
        } else {
            console.log("obs User logged out");
            history.push("/login");
        }
    });

    const pageData = useContext(PageContext);

    pageData.passHomePage();

    return (
        <div>
            <Backdrop open={true}><CircularProgress color="inherit" /></Backdrop>
        </div>
    )
}