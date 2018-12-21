import React, { Component } from 'react';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { email: this.props.email };
    }

    render() {
        return (
            <div>
                <h1>{this.state.email}</h1>
                <input type="email" name="email" defaultValue={this.props.email} onInput={e => this.setState({ email: e.target.value })} />
            </div>
        );
    }
}
