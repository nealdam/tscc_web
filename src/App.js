import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom"
import LoginPage from "./pages/login/LoginPage";
import OperatorPage from "./pages/operator/OperatorPage";
import ManagerPage from "./pages/manager/ManagerPage";

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
                    <Route path="/">
                        <LoginPage />
                    </Route>
                </Switch>
                
            </div>
        </Router>
    )
}