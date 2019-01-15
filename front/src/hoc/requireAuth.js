import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default (Component, requireAuth = true) => connect(({ auth }) => ({ authenticated: Boolean(auth.user) }))(
    ({ authenticated, ...rest }) =>
        (authenticated === Boolean(requireAuth)) ? <Component {...rest} /> : <Redirect to="/" />
);
