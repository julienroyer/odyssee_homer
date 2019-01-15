import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export default Component => connect(({ auth }) => ({ authenticated: Boolean(auth.user.token) }))(
    ({ authenticated, ...rest }) => authenticated ? <Component {...rest} /> : <Redirect to="/" />
);
