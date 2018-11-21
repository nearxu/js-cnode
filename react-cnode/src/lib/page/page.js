import React, { Component } from "react";
import PropTypes from "prop-types";
import { withHeader } from "./header";
import { isLogin } from '../auth/auth';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            hasError: false
        }
    }
    componentDidMount() {
        if (!this.props.isLoginRequired) {
            this.setState({ ready: true });
            return;
        }
        isLogin()
            .then(() => {
                this.setState({ ready: true })
            })
            .catch(e => {
                const url = '/#/login?next=' + encodeURIComponent(window.location.href);
                window.location.replace(url);
            })

    }
    render() {
        return (
            <div>
                {this.state.ready ? (this.props.children) : (
                    <div>loading !!!</div>
                )}
            </div>
        )
    }
}