import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { get } from '../helpers/fetch';

class Profile extends React.Component {
    state = { profile: {} };

    componentDidMount() {
        const { user } = this.props;
        get(`/api/user/${encodeURIComponent(user.email)}/profile`, user.token)
            .then(profile => this.setState({ profile }))
            .catch(({ message }) => this.setState({ flash: message }));
    }

    logout = () => this.props.logout();

    render() {
        const { email } = this.props.user, { flash, profile } = this.state;
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
