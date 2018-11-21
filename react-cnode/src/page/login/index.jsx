import React, { Component } from "react";
import withHeader from "../../lib/page/header";
import http from '../../lib/service/http';
import { setAuth } from '../../lib/auth/auth';
import { withRouter } from 'react-router';

import './login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
        this.props.setTitle('login')
    }
    submitHandle = (e) => {
        http.post('/accesstoken', {
            accesstoken: this.state.token
        })
            .then(res => {
                setAuth(this.state.token, res.data)
            })
            .then(() => {
                console.log(this.props);
                this.props.router.replace('/me');
            })
            .catch(err => {
                console.log(err);
            })
    }
    handleChange = (e) => {
        this.setState({ token: e.target.value.trim() })
    }
    render() {
        const { token } = this.state;
        return (
            <div className='login'>
                <form onSubmit={this.submitHandle}>
                    <input type="text" value={token} onChange={this.handleChange} />
                    <button type='submit'>submit</button>
                </form>
            </div>
        )
    }
}

export default withRouter(withHeader(Login))