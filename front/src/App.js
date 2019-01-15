import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import reducers from './reducers';
import requireAuth from './hoc/requireAuth';

const store = createStore(reducers);

const DefaultRedirect = connect(({ auth }) => ({ authenticated: Boolean(auth.user) }))(
    ({ authenticated }) => <Redirect to={authenticated ? '/profile' : '/signin'} />
);

const App = () => (
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={DefaultRedirect} />
                    <Route path="/profile" component={requireAuth(Profile)} />
                    <Route path="/signin" component={requireAuth(Signin, false)} />
                    <Route path="/signup" component={requireAuth(Signup, false)} />
                    <Route render={({ location }) => <>
                        <p>The requested URL <code>{location.pathname}</code> was not found.</p>
                        <p><Link to="/">Home</Link></p>
                    </>} />
                </Switch>
            </Router>
        </Provider>
    </React.StrictMode>
);

export default App;
