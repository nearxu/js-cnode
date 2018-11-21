import React, { Component } from 'react';

import DataList from '../../lib/component/data-list';
import http from '../../lib/service/http';
import Tab from '../component/tab';
import ListComponent from '../component/list';
import Footer from '../component/footer';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.getData();
    }
    getData(type = 'all') {
        http.get('/topics', {
            tab: type,
        })
            .then(res => {
                this.setState({ data: this.state.data.concat(res.data.data) })
            })
            .catch(err => {
                console.log(err);
            })
    }
    toggle(url) {
        this.getData(url)
    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <Tab toggle={this.toggle.bind(this)} />
                {/*
                    data.length === 0 ?
                        (<div>empty !!!!</div>) :
                        (
                            data.map((item, index) => {
                                return <ListComponent key={index} item={item} />
                            })
                        )
                        */}
                <Footer />
            </div>
        )
    }
}