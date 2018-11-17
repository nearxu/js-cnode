import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ListComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { item } = this.props;
        if (!item) return <div />
        return (
            <Link to={'/detail/:' + item.id}>{item.content}</Link>
        )
    }
}