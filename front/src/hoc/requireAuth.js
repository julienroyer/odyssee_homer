'use strict';

import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const requireAuth = (Component, mustBeAuthenticated = true) => connect(({ auth }) => ({ authenticated: Boolean(auth.user) }))(
    ({ authenticated, ...rest }) =>
        (Boolean(authenticated) === Boolean(mustBeAuthenticated)) ? <Component {...rest} /> : <Redirect to="/" />
);

export default requireAuth;
