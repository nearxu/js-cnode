import React, { Component } from 'react';
import withHeader from '../../lib/page/header';
import withPage from '../../lib/page/with-page';
import session from '../../lib/auth/session';

class MeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userinfo: {}
        }
        this.props.setTitle('me')
        console.log(this.props, 'props')
    }
    componentDidMount() {
        const sessionUser = session.get('userInfo');
        if (sessionUser) {
            this.setState({ userinfo: sessionUser });
        }
    }
    render() {
        const { userinfo } = this.state;
        return (
            <div>
                <img src={userinfo.avatar_url} />
                <div>{userinfo.loginname}</div>
            </div>
        )
    }
}

export default withPage(withHeader(MeComponent), true);