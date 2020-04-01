import React, { useContext } from 'react';
import { auth } from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';
import { PageContext } from '../../context/PageProvider';

export default function HomePage() {

    const history = useHistory();

    auth.onAuthStateChanged(userAuth => {
        if (userAuth) {
            console.log("obs User logged in " + userAuth.email);
            history.push("/operator");
            // const history = useHistory();
        } else {
            console.log("obs User logged out");
            history.push("/login");
        }
    });

    const pageData = useContext(PageContext);

    pageData.passHomePage();

    return (
        <div></div>
    )
}