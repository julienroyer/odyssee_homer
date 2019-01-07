import React from 'react';

export default class Profile extends React.Component {
    state = { flash: '', profile: { name: 'Loading…', lastname: 'Loading…', }, };

    componentDidMount() {
        fetch(`/user/${this.props.match.params.email}/profile`)
            .then(res => res.json().then(
                obj => res.ok ? this.setState({ profile: obj }) : this.setState({ flash: obj.flash }),
                () => this.setState({ flash: `Request failure (HTTP ${res.status})` }))
            ).catch(err => this.setState({ flash: `Request failure (${err.message})` }));
    }

    logout = () => { this.props.history.push('/') }

    render() {
        const { email, } = this.props.match.params;
        const { flash, profile, } = this.state;

        return <>
            <button onClick={this.logout}>Log out</button>
            {flash ? <p><mark>{flash}</mark></p> : ''}
            <dl>
                <dt>Email</dt>
                <dd>{email}</dd>
                <dt>Name</dt>
                <dd>{profile.name}</dd>
                <dt>Last name</dt>
                <dd>{profile.lastname}</dd>
            </dl>
        </>;
    }
}
