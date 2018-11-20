// @flow

import * as React from 'react';
import { DataListSession } from './service';

const LIST_DATA = 'LIST_DATA';
const LIST_DATA_POSITION = 'LIST_DATA_POSITION'

export default class DataList extends React.Component {
    static defaultProps = {
        pageIndex: 0,
        pageSize: 10,
        id: window.location.href
    }
    // listSession:DataListSession
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            hasNext: false,
            pageIndex: 0,
            pageSize: 10
        }
        this.listSession = new DataListSession(props.id);
    }
    componentDidMount = () => {
        // window.addEventListener('beforeunload', this.removeListSession);
        if (this.listSession.get(LIST_DATA)) {
            this.recoveryFromSession();
        } else {
            this.fetch();
        }
    }
    componentWillUnmount = () => {
        // window.removeEventListener('beforeunload', this.removeListSession);
    }
    removeListSession = () => {
        this.listSession.remove(LIST_DATA)
    }
    recoveryFromSession = () => {
        const { data } = this.listSession.get(LIST_DATA);
        this.setState({ data }, () => {
            const position = this.listSession.get(LIST_DATA_POSITION)
            window.scroll(0, position);
        })
    }
    fetch = (
        pageIndex?: number = this.state.pageIndex,
        pageSize?: number = this.state.pageSize
    ) => {
        this.props.fetch(pageIndex, pageSize).then(data => {
            this.setState({ data: this.state.data.concat(data) });
        })
    }
    saveData = () => {
        console.log(this.state, 'state')
        this.listSession.save(LIST_DATA, this.state);
        this.listSession.save(LIST_DATA_POSITION, window.scrollY);
    }
    render() {
        const { data } = this.state;
        const { render } = this.props;
        return (
            <React.Fragment>
                {data.map((item, index) => render(item, index, this.saveData))}
            </React.Fragment>
        )
    }
}