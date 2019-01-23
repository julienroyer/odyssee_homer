import React from 'react';
import { Link } from 'react-router-dom';

export default class Signup extends React.Component {
    state = { fields: {} };

    onChange = e => (t => this.setState({ fields: { ...this.state.fields, [t.name]: t.value.trim() } }))(e.target);

    onSubmit = e => {
        e.preventDefault();
        const { passwordbis, ...fields } = this.state.fields;
        if (passwordbis !== fields.password) {
            this.setState({ flash: `'Password' and 'Password bis' must be the same.` })
        } else {
            fetch("/api/auth/signup",
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify(fields),
                }
            ).then(res => res.json().then(
                obj => res.ok ? this.props.history.push('/') : this.setState({ flash: obj.message || 'unknow error' }),
                () => this.setState({ flash: `Request failure (HTTP ${res.status})` }))
            ).catch(err => this.setState({ flash: `Request failure (${err.message})` }));
        }
    };

    render() {
        const { flash, fields } = this.state;
        return <>
            <p><Link to="/signin">Sign in</Link></p>
            <form onSubmit={this.onSubmit} onChange={this.onChange}>
                <h1>Sign up: {JSON.stringify(fields, undefined, 1)}</h1>

                {Boolean(flash) && <p><mark>Flash: {flash}</mark></p>}

                <p><label>Email<br /><input name="email" type="email" autoComplete="username" required /></label></p>
                <p><label>Password<br /><input name="password" type="password" autoComplete="new-password" required /></label></p>
                <p><label>Password bis<br /><input name="passwordbis" type="password" autoComplete="new-password" required /></label></p>
                <p><label>Name<br /><input name="name" required onChange={this.onChange} /></label></p>
                <p><label>Last name<br /><input name="lastname" required onChange={this.onChange} /></label></p>
                <p><input type="submit" value="Submit" /></p>
            </form>
        </>;
    }
}
