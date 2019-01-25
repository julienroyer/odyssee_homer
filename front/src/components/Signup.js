import React from 'react';
import { Link } from 'react-router-dom';
import { postJson } from '../helpers/fetch';

export default class Signup extends React.Component {
    state = { fields: {} };

    onChange = e => (t => this.setState({ fields: { ...this.state.fields, [t.name]: t.value } }))(e.target);

    onSubmit = e => {
        e.preventDefault();
        if (!this.state.loading) {
            const { passwordbis, ...fields } = this.state.fields;
            if (passwordbis !== fields.password) {
                this.setState({ flash: `'Password' and 'Password bis' must be the same.` });
            } else {
                this.setState({ flash: undefined, loading: true });
                postJson('/api/auth/signup', fields)
                    .then(() => this.props.history.push('/'))
                    .catch(({ message }) => this.setState({ flash: message, loading: false }));
            }
        }
    };

    render() {
        const { flash, fields, loading } = this.state;
        return <>
            <p><Link to="/signin">Sign in</Link></p>
            <form onSubmit={this.onSubmit} onChange={this.onChange}>
                <h1>Sign up: {JSON.stringify(fields, undefined, 1)}</h1>

                {Boolean(flash) && <p><mark>{flash}</mark></p>}

                <p><label>Email<br /><input name="email" type="email" autoComplete="username" required /></label></p>
                <p><label>Password<br /><input name="password" type="password" autoComplete="new-password" required /></label></p>
                <p><label>Password bis<br /><input name="passwordbis" type="password" autoComplete="new-password" required /></label></p>
                <p><label>Name<br /><input name="name" required /></label></p>
                <p><label>Last name<br /><input name="lastname" required /></label></p>
                <p><input type="submit" value="Submit" disabled={loading === true} /></p>
            </form>
        </>;
    }
}
