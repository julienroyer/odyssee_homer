import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import React from 'react';
import Profile from './Profile';
import Signin from './Signin';
import Signup from './Signup';

export default () => (
    <Router>
        <Switch>
            <Redirect exact from="/" to="/signin" />
            <Route path="/signin" component={Signin} />
            <Route path="/profile" component={Profile} />
            <Route path="/signup" component={Signup} />
            <Route render={({ location }) => [
                <p key="0">The requested URL <code>{location.pathname}</code> was
                    not found on this server (404).</p>,
                <p key="1"><Link to="/">Home</Link></p>,
            ]} />
        </Switch>
    </Router>
);
