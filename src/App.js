import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom"
import LoginPage from "./pages/login/LoginPage";
import OperatorPage from "./pages/operator/OperatorPage";
import ManagerPage from "./pages/manager/ManagerPage";
import NoMatchPage from "./pages/noMatch/NoMatchPage";

export default function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/operator">
                        <OperatorPage />
                    </Route>
                    <Route path="/manager">
                        <ManagerPage />
                    </Route>
                    <Route exact path="/">
                        <LoginPage />
                    </Route>
                    <Route path="*">
                        <NoMatchPage />
                    </Route>
                </Switch>
                
            </div>
        </Router>
    )
}