import * as React from 'react';
import { DataListSession } from './service';

const LIST_DATA = 'LIST_DATA';
const LIST_DATA_POSITION = 'LIST_DATA_POSITION'

export default class DataList extends React.Component {
    state = {
        data: []
    }
    static defaultProps = {
        pageIndex: 0,
        pageSize: 10,
        id: window.location.href
    }
    // listSession:DataListSession
    constructor(props) {
        super(props);
        this.listSession = new DataListSession(props.id);
    }
    componentDidMount = () => {
        window.addEventListener('beforeunload', this.removeListSession);
        if (this.listSession.get(LIST_DATA)) {
            this.recoveryFromSession();
        } else {
            this.fetch();
        }
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
    fetch = () => {
        this.props.fetch().then(data => {
            this.setState({ data: this.state.data });
        })
    }
    render() {
        return (
            <React.Fragment>
                {this.state.data.map((item, index) => this.render(item, index))}
            </React.Fragment>
        )
    }
}