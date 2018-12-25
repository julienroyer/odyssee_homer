import React, { Component } from 'react';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <dl>
                <dt>Email</dt>
                <dd>{this.state.email}</dd>
                <dt>Name</dt>
                <dd>{this.state.name}</dd>
                <dt>Last name</dt>
                <dd>{this.state.lastname}</dd>
            </dl>
        );
    }
}
