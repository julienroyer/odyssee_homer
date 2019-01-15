import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

class Profile extends React.Component {
    state = { profile: {}, };

    componentDidMount() {
        fetch(`/api/user/${this.props.user.email}/profile`, {
            headers: new Headers({
                Authorization: `Bearer ${this.props.user.token}`,
            }),
        }).then(res => res.json().then(
            obj => res.ok ? this.setState({ profile: obj }) : this.setState({ flash: obj.flash }),
            () => this.setState({ flash: `Request failure (HTTP ${res.status})` }))
        ).catch(err => this.setState({ flash: `Request failure (${err.message})` }));
    }

    logout = () => this.props.logout();

    render() {
        const email = this.props.user.email, { flash, profile, } = this.state;
        return <>
            <button onClick={this.logout}>Log out</button>
            <h1>Profile</h1>
            {Boolean(flash) && <p><mark>{flash}</mark></p>}
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
