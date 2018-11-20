import React, { Component } from 'react';

import DataList from '../../lib/component/data-list';
import http from '../../lib/service/http';
import Tab from '../component/tab';
import ListComponent from '../component/list';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    getData(type = 'all') {
        return new Promise((resolve, reject) => {
            http.get('/topics', {
                tab: type,
            })
                .then(res => {
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
        return (
            <div>
                <Tab toggle={this.toggle.bind(this)} />
                <DataList
                    fetch={this.getData.bind(this)}
                    id={'home-list'}
                    render={(data, index, saveData) => {
                        console.log(data, 'data');
                        return (
                            <ListComponent saveData={saveData} key={index} item={data} />
                        )
                    }}
                />
            </div>
        )
    }
}