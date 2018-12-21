import React, { Component } from 'react';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { email: this.props.email };
    }

    render() {
        return (
            <form>
                <h1>Inscription pour {this.state.email}</h1>

                <p><input name="email" type="email" defaultValue={this.props.email}
                    onInput={e => this.setState({ email: e.target.value })} /></p>
                <p><input name="password" type="password" /></p>
                <p><input name="passwordbis" type="password" /></p>
                <p><input name="name" /></p>
                <p><input name="lastname" /></p>
                <p><input type="submit" value="Soumettre" /></p>
            </form>
        );
    }
}
