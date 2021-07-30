import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./App"
import NotFound from './NotFound'
// import Header from './Components/Header'

function Router(props) {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Header my_hist={props.history} /> */}
                <Route exact path="/" component={App} />
                <Route exact path="/diary" component={App} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router