import React, {Component} from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from "./pages/login/login"
import Admin from "./pages/admin/admin"

export default class App extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/' component={Admin}></Route>
                        <Redirect to='/login' />
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}
