import React, { Component } from 'react';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onInput = e => (t => this.setState({ [t.name]: t.value }))(e.target);

    onSubmit = e => {
        e.preventDefault();
        fetch("/auth/signup",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(this.state),
            })
            .then(res => res.json())
            .then(
                res => this.setState({ flash: res.flash }),
                err => this.setState({ flash: err.flash })
            );
    };

    render() {
        return (
            <form onInput={this.onInput} onSubmit={this.onSubmit}>
                <h1>Signup: {JSON.stringify(this.state, undefined, 1)}</h1>

                <p>Flash: {this.state.flash || ""}</p>

                <p><label>Email<br /><input name="email" type="email" autoComplete="username" /></label></p>
                <p><label>Password<br /><input name="password" type="password" autoComplete="new-password" /></label></p>
                <p><label>Password bis<br /><input name="passwordbis" type="password" autoComplete="new-password" /></label></p>
                <p><label>Name<br /><input name="name" /></label></p>
                <p><label>Last name<br /><input name="lastname" /></label></p>
                <p><input type="submit" value="Submit" /></p>
            </form>
        );
    }
}
