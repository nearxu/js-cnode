import React, { Component } from 'react';

export default class Pagination extends Component {
    static defaultProps = {
        nextText: '下一页'
    }
    nextPage = () => {
        const { pageIndex } = this.props;
        this.props.onPageChange && this.props.onPageChange(pageIndex + 1)
    }
    render() {
        const { hasNext, nextText } = this.props;
        if (!hasNext) return null;
        return (
            <button onClick={this.nextPage}>{nextText}</button>
        )
    }
}