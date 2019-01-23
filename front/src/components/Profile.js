import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

class Profile extends React.Component {
    state = { profile: {} };

    async componentDidMount() {
        try {
            const res = await fetch(`/api/user/${this.props.user.email}/profile`, {
                headers: new Headers({
                    Authorization: `Bearer ${this.props.user.token}`,
                })
            });
            try {
                const obj = await res.json();
                res.ok ? this.setState({ profile: obj }) : this.setState({ flash: obj.message })
            } catch (e) {
                this.setState({ flash: `request failure - HTTP ${res.status}` })
            }
        } catch ({ message }) {
            this.setState({ flash: `request failure${message ? ` (${message})` : ''}` });
        }
    }

    logout = () => this.props.logout();

    render() {
        const email = this.props.user.email, { flash, profile } = this.state;
        return <>
            <button onClick={this.logout}>Log out</button>
            <h1>Profile</h1>
            {Boolean(flash) && <p><mark>Flash: {flash}</mark></p>}
            <dl>
                <dt>Email</dt>
                <dd>{email}</dd>
                <dt>Name</dt>
                <dd>{profile.name || <i>Loading…</i>}</dd>
                <dt>Last name</dt>
                <dd>{profile.lastname || <i>Loading…</i>}</dd>
            </dl>
        </>;
    }
}

export default connect(({ auth }) => auth, { logout })(Profile);
