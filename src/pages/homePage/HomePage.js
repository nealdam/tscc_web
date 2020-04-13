import React, { useContext, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { useHistory, Redirect } from 'react-router-dom';
import { PageContext, UserContext } from '../../context/PageProvider';
import { Backdrop, CircularProgress } from '@material-ui/core';

export default function HomePage() {

    const userData = useContext(UserContext);

    const [isTokenSetted, setIsTokenSetted] = useState(false);

    const history = useHistory();

    auth.onAuthStateChanged(userAuth => {
        if (userAuth) {
            console.log("obs User logged in " + userAuth.email);
            userAuth.getIdToken().then(token => {
                console.log("Token setted");
                userData.setToken(token);
                setIsTokenSetted(true);
            })
            userData.setEmail(userAuth.email);
            // history.push("/operator");
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
            {isTokenSetted
                ? <Redirect to={{ pathname: "/operator" }} />
                : <Backdrop open={true}><CircularProgress color="inherit" /></Backdrop>}
        </div>
    )
}