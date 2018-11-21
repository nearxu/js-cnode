import React, { Component } from "react";
import Page from "./page";
import PropTypes from "prop-types";
import { getToken } from "../auth/auth";


function withPage(
    InnerComponent,
    isLoginRequired = false,
    redirect = true,
    hideHeader = false
) {
    return class PageComponent extends Component {
        constructor(props) {
            super(props);
            this.page = undefined;
        }
        static propTypes = {
            innerRef: PropTypes.func
        }
        setTitle(title) {
            this.page.setTitle(title)
        }
        setRightNavComp(component) {
            this.page.setRightNavComp(component);
        }
        setBackAction(action) {
            this.page.setBackAction(action);
        }
        render() {
            const passProps = {
                ...this.props,
                setTitle: this.setTitle.bind(this),
                setRightNavComp: this.setRightNavComp.bind(this),
                setBackAction: this.setBackAction.bind(this),
                token: getToken()
            }
            const propsRef = this.props.innerRef ? { ...passProps, ref: this.props.innerRef.bind(this) } : { ...passProps };
            return (
                <Page
                    {...this.props}
                    ref={page => this.page = page}
                    isLoginRequired={isLoginRequired}
                    redirect={redirect}
                    hideHeader={hideHeader}
                >
                    <InnerComponent {...propsRef} />
                </Page>
            )
        }
    }
}

export default withPage;