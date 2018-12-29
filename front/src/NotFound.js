import React from 'react';

export default ({ location }) => [
    <p key="0">The requested URL <code>{location.pathname}</code> was not found on this server (404).</p>,
    <p key="1"><Link to="/">Home</Link></p>,
];
