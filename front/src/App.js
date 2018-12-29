import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import React from 'react';
import Profile from './Profile';
import Signin from './Signin';
import Signup from './Signup';
import NotFound from './NotFound';

export default () => (
    <Router>
        <Switch>
            <Redirect exact from="/" to="/signin" />
            <Route path="/signin" component={Signin} />
            <Route path="/profile" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);
