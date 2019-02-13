import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { getJson } from '../helpers/fetch';

class Profile extends React.Component {
    state = { profile: {} };

    componentDidMount() {
        const { user } = this.props;
        getJson(`/api/user/${encodeURIComponent(user.email)}/profile`, user.token)
            .then(profile => this.setState({ profile }))
            .catch(({ message }) => this.setState({ flash: message }));
    }

    logout = () => this.props.logout();

    render() {
        const { email } = this.props.user;
        const { flash, profile: {
            name = <i>…</i>,
            lastname = <i>…</i>,
        } } = this.state;
        return <>
            <button onClick={this.logout}>Log out</button>
            <h1>Profile</h1>
            <p>{flash ? <mark>{flash}</mark> : name ? '.' : <i>Loading…</i>}</p>
            <dl>
                <dt>Email</dt>
                <dd>{email}</dd>
                <dt>Name</dt>
                <dd>{name}</dd>
                <dt>Last name</dt>
                <dd>{lastname}</dd>
            </dl>
        </>;
    }
}

export default connect(({ auth }) => auth, { logout })(
    props => <Profile key={props.user.email} {...props} />
);
