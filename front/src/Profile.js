import React from 'react';
import { withRouter } from 'react-router-dom';

class Profile extends React.Component {
    logout = () => {
        this.props.history.push('/');
    };

    render() {
        return <>
            <button onClick={this.logout}>Log out</button>
            <dl>
                <dt>Email</dt>
                <dd>{this.props.email}</dd>
                <dt>Name</dt>
                <dd>{this.props.name}</dd>
                <dt>Last name</dt>
                <dd>{this.props.lastname}</dd>
            </dl>
        </>;
    }
}

export default withRouter(Profile);
