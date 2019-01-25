import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { postJson } from '../helpers/fetch';

class Signin extends React.Component {
    state = { fields: {} };

    onChange = e => (t => this.setState({ fields: { ...this.state.fields, [t.name]: t.value } }))(e.target);

    onSubmit = e => {
        e.preventDefault();
        if (!this.state.loading) {
            this.setState({ flash: undefined, loading: true });
            postJson('/api/auth/signin', this.state.fields)
                .then(this.props.login)
                .catch(({ message }) => this.setState({ flash: message, loading: false }));
        }
    };

    render() {
        const { flash, fields, loading } = this.state;
        return <>
            <p><Link to="/signup">Sign up</Link></p>
            <form onSubmit={this.onSubmit} onChange={this.onChange}>
                <h1>Sign in: {JSON.stringify(fields, undefined, 1)}</h1>

                <p>{flash ? <mark>{flash}</mark> : loading ? <i>Loading…</i> : '.'}</p>

                <p><label>Email<br /><input name="email" type="email" autoComplete="username" required /></label></p>
                <p><label>Password<br /><input name="password" type="password" autoComplete="current-password" required /></label></p>
                <p><input type="submit" value="Submit" /></p>
            </form>
        </>;
    }
}

export default connect(null, { login })(Signin);
