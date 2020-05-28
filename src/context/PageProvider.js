import React, { Component, createContext } from "react";

export const UserContext = createContext();
export const PageContext = createContext();

class PageData {
    constructor() {
        this.isHomePageVisited = false;
    }

    passHomePage() {
        this.isHomePageVisited = true;
    }
}

class UserData {
    constructor() {
        this.userToken = null;
        this.userEmail = null;
    }

    setToken(token) {
        this.userToken = token;
    }

    setEmail(email) {
        this.userEmail = email;
    }
}

class PageProvider extends Component {
    state = {
        pageData: new PageData(),
        userData: new UserData(),
    };

    render() {
        return (
            <PageContext.Provider value={this.state.pageData}>
                <UserContext.Provider value={this.state.userData}>
                    {this.props.children}
                </UserContext.Provider>
            </PageContext.Provider>
        )
    }
}

export default PageProvider;