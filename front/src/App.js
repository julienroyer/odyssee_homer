import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Profile from './containers/Profile';

export default () => (
    <React.StrictMode>
        <Router>
            <Switch>
                <Redirect exact from="/" to="/signin" />
                <Route path="/signin" component={Signin} />
                <Route path="/signup" component={Signup} />
                <Route path="/profile/:email" component={Profile} />
                <Route render={({ location }) => <>
                    <p>The requested URL <code>{location.pathname}</code> was not found on this server (404).</p>
                    <p><Link to="/">Home</Link></p>
                </>} />
            </Switch>
        </Router>
    </React.StrictMode>
);
