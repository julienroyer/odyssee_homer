import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default connect()(class Signin extends React.Component {
    state = { flash: '', fields: {}, };

    onLogin(obj) {
        this.props.dispatch({
            type: "CREATE_SESSION",
            user: obj.user,
            token: obj.token,
        });
        this.props.history.push(`/profile/${this.state.fields.email}`);
    }

    onInput = e => (t => this.setState({ fields: { ...this.state.fields, [t.name]: t.value } }))(e.target);

    onSubmit = e => {
        e.preventDefault();
        const { fields, } = this.state;
        fetch("/auth/signin",
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify(fields),
            }
        ).then(res => res.json().then(
            obj => res.ok ? this.onLogin(obj) : this.setState({ flash: obj.flash || 'Unknown error' }),
            () => this.setState({ flash: `Request failure (HTTP ${res.status})` }))
        ).catch(err => this.setState({ flash: `Request failure (${err.message})` }));
    };

    render() {
        const { flash, fields, } = this.state;
        return <>
            <p><Link to="/signup">Sign up</Link></p>
            <form onChange={this.onInput} onSubmit={this.onSubmit}>
                <h1>Sign in: {JSON.stringify(fields, undefined, 1)}</h1>

                {Boolean(flash) && <p><mark>{flash}</mark></p>}

                <p><label>Email<br /><input name="email" type="email" autoComplete="username" required /></label></p>
                <p><label>Password<br /><input name="password" type="password" autoComplete="current-password" required /></label></p>
                <p><input type="submit" value="Submit" /></p>
            </form>
        </>;
    }
})
