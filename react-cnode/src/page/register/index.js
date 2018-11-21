import React, { Component } from "react";
import withHeader from "../../lib/page/header";

class Login extends Component {
    constructor(props) {
        super(props);
        this.props.setTitle('login')
    }
    render() {
        return (
            <div className='login'>
                hello login
            </div>
        )
    }
}

export default withHeader(Login)