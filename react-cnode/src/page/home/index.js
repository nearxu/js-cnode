import React, { Component } from 'react';

import DataList from '../../lib/component/data-list';
import http from '../../lib/service/http';
import Tab from '../component/tab';
import ListComponent from '../component/list';
import Footer from '../component/footer';
import "./home.scss";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        console.log(this.props, 'props')

    }
    componentDidMount() {
        this.pushQueryParams();
    }
    pushQueryParams() {
        const { router } = this.props;
        const { location } = router;
        const { query } = location;
        router.replace({
            ...location,
            query: {
                ...query,
                tab: 'all'
            }
        })
    }
    getData(type = 'all', pageIndex = 0, pageSize = 10) {
        return new Promise((resolve, reject) => {
            http.get('/topics', {
                pageIndex: pageIndex,
                limit: pageSize,
                tab: type
            })
                .then(res => {
                    // this.setState({ data: this.state.data.concat(res.data.data) })
                    resolve(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }
    toggle(url) {
        this.getData(url)
    }
    render() {
        const { data } = this.state;
        const tab = this.props.router.location.query['tab'] || 'all';
        return (
            <div className='home-component'>
                <Tab toggle={this.toggle.bind(this)} />
                <div className='content'>
                    <DataList
                        fetch={this.getData.bind(this, tab)}
                        id='home-list'
                        render={(data, index, saveData) => {
                            return <ListComponent key={index} item={data} saveData={saveData} />
                        }}
                    />
                </div>
                <Footer />
            </div>
        )
    }
}