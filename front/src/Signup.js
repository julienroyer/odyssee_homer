import React, { Component } from 'react';

export default class Signup extends Component {
    onInput(e) {
        const t = e.target;
        this.setState({ [t.name]: t.value });
    }

    onSubmit(e) {
        console.log('Signup', this.state);
        e.preventDefault();
    }

    render() {
        return (
            <form onInput={e => this.onInput(e)} onSubmit={e => this.onSubmit(e)}>
                <h1>Signup: {JSON.stringify(this.state, undefined, 1)}</h1>

                <p><input name="email" type="email" autoComplete="username" /></p>
                <p><input name="password" type="password" autoComplete="new-password" /></p>
                <p><input name="passwordbis" type="password" autoComplete="new-password" /></p>
                <p><input name="name" /></p>
                <p><input name="lastname" /></p>
                <p><input type="submit" value="Soumettre" /></p>
            </form>
        );
    }
}
