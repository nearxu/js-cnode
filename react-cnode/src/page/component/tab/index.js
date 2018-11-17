import React, { Component } from 'react';
import './tab.scss';

export default class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0
        }
    }
    toggleTab(index) {
        if (index === this.state.id) return;
        this.props.toggle(index);
    }
    render() {
        const { tabs } = this.props || [];
        if (!tabs.length) return <div />;
        return (
            <div className='tab-component'>
                {
                    tabs.map((item, index) => {
                        return (
                            <span className={index === this.state.id ? 'active' : ''} key={index} onClick={(index) => this.toggleTab(index)}>{item.name}</span>
                        )
                    })
                }
            </div>
        )
    }
}