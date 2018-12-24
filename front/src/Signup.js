import React, { Component } from 'react';

export default class Signup extends Component {
    onInput = e => (t => this.setState({ [t.name]: t.value }))(e.target);

    onSubmit = e => {
        e.preventDefault();
        const { flash, ...fields } = this.state || {};
        fetch("/auth/signup",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(fields),
            })
            .then(res => res.json())
            .then(
                res => this.setState({ flash: res.flash || 'OK' }),
                err => this.setState({ flash: err.flash || 'KO' })
            )
            .catch(err => this.setState({ flash: err || 'KO' }));
    };

    render() {
        const { flash, ...fields } = this.state || {};
        return (
            <form onInput={this.onInput} onSubmit={this.onSubmit}>
                <h1>Signup: {JSON.stringify(fields, undefined, 1)}</h1>

                {flash ? <p>Flash: {flash}</p> : ''}

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
