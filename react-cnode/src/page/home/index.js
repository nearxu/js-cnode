import React, { Component } from 'react';

import DataList from '../../lib/component/data-list';
import axios from 'axios';

const baseUrl = 'https://cnodejs.org/api/v1';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    getData() {
        axios.get(baseUrl + '/v1/topics', {
            params: {

            }
        })
            .then(
                res => {

                }
            )
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        return (
            <div>
                hello Home!!!
                <DataList
                    fetch={this.getData.bind(this)}
                    id='list1'
                    render={(data, index) => {
                        return (
                            <div>list index</div>
                        )
                    }}
                />
            </div>
        )
    }
}