import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './footer.scss';

const tabs = [
    { name: '我的', url: 'me' },
    { name: '登录', url: 'login' },
    { name: '注册', url: 'register' },
]
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null
        }
    }
    toggleTab(index) {
        if (index === this.state.id) return null;
        this.setState({ id: index });
        this.props.router.push(`/${tabs[index].url}`);
    }
    render() {
        if (!tabs.length) return <div />;
        return (
            <div className='footer'>
                <div className='tab-component'>
                    {
                        tabs.map((item, index) => {
                            return (
                                <div
                                    className={index === this.state.id ? 'active' : ''}
                                    key={index}
                                    onClick={this.toggleTab.bind(this, index)}
                                >
                                    <span>{item.name}</span>
                                    <img src={require("../img/account_grey@2x.png")} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Footer);