import { Component, createContext } from "react";
import React from 'react'

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

class PageProvider extends Component {
    state = {
        pageData: new PageData(),
    }


    render() {
        return (
            <PageContext.Provider value={this.state.pageData}>
                {this.props.children}
            </PageContext.Provider>
        )
    }
}

export default PageProvider;