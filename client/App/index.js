import React from 'react';
import { BrowserRouter, Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './routes/Home';
import history from '../history';

export default () => {
    return (
        <BrowserRouter>
            <Router history={history}>
                <Switch>
                    <Route exact path={'/'} component={Home} />
                </Switch>
            </Router >
        </BrowserRouter>
    );
}