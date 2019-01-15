import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Profile from './containers/Profile';
import reducers from './reducers';
import requireAuth from './hoc/requireAuth';

const store = createStore(reducers);

export default () => (
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Redirect exact from="/" to="/signin" />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/profile" component={requireAuth(Profile)} />
                    <Route render={({ location }) => <>
                        <p>The requested URL <code>{location.pathname}</code> was not found.</p>
                        <p><Link to="/">Home</Link></p>
                    </>} />
                </Switch>
            </Router>
        </Provider>
    </React.StrictMode>
);
