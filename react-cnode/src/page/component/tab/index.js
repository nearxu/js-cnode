import React, { Component } from 'react';
import './tab.scss';
import { tabs } from '../../../config';
import { withRouter } from 'react-router';

class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0
        }
    }
    toggleTab(index) {
        if (index === this.state.id) return;
        this.props.toggle(tabs[index].url);
        const { router } = this.props;
        const { location } = router;
        const { query } = location;
        router.replace({
            ...location,
            query: {
                ...query,
                tab: tabs[index].url
            }
        })
    }
    render() {
        if (!tabs.length) return <div />;
        return (
            <div className='tab-component'>
                {
                    tabs.map((item, index) => {
                        return (
                            <span className={index === this.state.id ? 'active' : ''} key={index} onClick={this.toggleTab.bind(this, index)}>{item.name}</span>
                        )
                    })
                }
            </div>
        )
    }
}

export default withRouter(Tab);