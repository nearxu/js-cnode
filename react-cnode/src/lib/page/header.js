import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './header.scss';

function Header(props) {
    const { title, rightNavComp, backAction, router } = props;
    return (
        <div className='header-component'>
            <div className='back' onClick={() => window.history.go(-1)}>
                <div className='back-icon'></div>
            </div>
            <div className='title'>{title}</div>
            <div className='menu'>
                {rightNavComp && React.createElement(rightNavComp)}
            </div>
        </div>
    )
}

function withHeader(InnerComponent) {
    return class HeaderComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                title: 'hello world',
                rightNavComp: undefined,
                backAction: undefined

            }
        }
        static propTypes = {
            innerRef: PropTypes.func,
            hideHeader: PropTypes.bool
        }
        setTitle(title) {
            this.setState({ title })
        }
        setRightNavComp(component) {
            this.setState({ rightNavComp: component });
        }
        setBackAction(action) {
            this.setState({ backAction: action });
        }
        render() {
            return (
                <div>
                    {!this.props.hideHeader && <Header {...this.state} {...this.props} />}
                    <div>
                        <InnerComponent
                            {...this.props}
                            setTitle={this.setTitle.bind(this)}
                            setRightNavComp={this.setRightNavComp.bind(this)}
                            setBackAction={this.setBackAction.bind(this)}
                        // ref={this.props.innerRef.bind(this)}
                        />

                    </div>
                </div>
            )
        }
    }
}

export default withHeader;