import React, { Component } from 'react';

function withHeader(InnerComponent) {
    return class HeaderComponent extends Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (
                <div>
                    <InnerComponent
                        {...this.props}
                        setTitle={this.setTitle.bind(this)}
                        ref={this.props.innerRef.bind(this)}
                    />
                </div>
            )
        }
    }
}