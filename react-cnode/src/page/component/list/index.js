import React, { Component } from 'react';
import { withRouter } from 'react-router';
import "./list.scss";
class ListComponent extends Component {
    constructor(props) {
        super(props);
    }
    toggleDetail(id) {
        console.log(this.props, 'props')
        this.props.router.push('/detail/:' + id)
        this.props.saveData();
    }
    render() {
        const { item } = this.props;
        if (!item) return <div />
        return (
            <div className='home-list' href="javascript:;" onClick={this.toggleDetail.bind(this, item.id)}>{item.title}</div>
        )
    }
}

export default withRouter(ListComponent);