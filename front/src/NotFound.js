import React from 'react';
import { Link } from 'react-router-dom';

export default ({ location }) => <>
    <p>The requested URL <code>{location.pathname}</code> was not found on this server (404).</p>
    <p><Link to="/">Home</Link></p>
</>;
