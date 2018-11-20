import React, { Component } from 'react';
import { withRouter } from 'react-router';

class ListComponent extends Component {
    constructor(props) {
        super(props);
    }
    toggleDetail(id) {
        console.log(this.props, 'props')
        this.props.history.push('/detail/:' + id)
        this.props.saveData();
    }
    render() {
        const { item } = this.props;
        if (!item) return <div />
        return (
            <a href="javascript:;" onClick={this.toggleDetail.bind(this, item.id)}>{item.title}</a>
        )
    }
}

export default withRouter(ListComponent);