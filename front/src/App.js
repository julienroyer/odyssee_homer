import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React from 'react';
import Profile from './Profile';
import Signin from './Signin';
import Signup from './Signup';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Signin} />
            <Route path="/signin" component={Signin} />
            <Route path="/profile" component={Profile} />
            <Route path="/signup" component={Signup} />
        </Switch>
    </BrowserRouter>
);
