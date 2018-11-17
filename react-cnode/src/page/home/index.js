import React, { Component } from 'react';

import DataList from '../../lib/component/data-list';
import http from '../../lib/service/http';
import { tabs } from '../../config';
import Tab from '../component/tab';
import ListComponent from '../component/list';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    getData(type, pageIndex, pageSize) {
        return new Promise((resolve, reject) => {
            http.get('/topics', {
                tab: type,
                pageIndex: pageIndex,
                limit: pageSize
            })
                .then(res => {
                    console.log(res.data, 'res')
                    resolve(res.data.data);
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }
    toggle() {

    }
    render() {
        return (
            <div>
                <Tab tabs={tabs} toggle={this.toggle.bind(this)} />
                {
                    tabs.map((m, i) => {
                        return (
                            <div key={i}>
                                <DataList
                                    fetch={this.getData.bind(this, m.url)}
                                    id='list'
                                    render={(data, index, saveData) => {
                                        console.log(data, 'data')
                                        return (
                                            <ListComponent saveData={saveData} key={index} item={data} />
                                        )
                                    }}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}