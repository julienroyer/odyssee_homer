import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return [
            <button key="0" onClick={() => this.props.history.push('/signin')}>Log out</button>,
            <dl key="1">
                <dt>Email</dt>
                <dd>{this.state.email}</dd>
                <dt>Name</dt>
                <dd>{this.state.name}</dd>
                <dt>Last name</dt>
                <dd>{this.state.lastname}</dd>
            </dl>,
        ];
    }
}

export default withRouter(Profile);
