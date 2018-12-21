import React, { Component } from 'react';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    onInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        console.log("onSubmit", this.state);
        e.preventDefault();
    }

    render() {
        const onInput = this.onInput.bind(this);
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <h1>Inscription : {JSON.stringify(this.state, undefined, 1)}</h1>

                <p><input name="email" type="email" autoComplete="username" defaultValue={this.props.email}
                    onInput={onInput} /></p>
                <p><input name="password" type="password" autoComplete="new-password"
                    onInput={onInput} /></p>
                <p><input name="passwordbis" type="password" autoComplete="new-password"
                    onInput={onInput} /></p>
                <p><input name="name"
                    onInput={onInput} /></p>
                <p><input name="lastname"
                    onInput={onInput} /></p>
                <p><input type="submit" value="Soumettre" /></p>
            </form>
        );
    }
}
