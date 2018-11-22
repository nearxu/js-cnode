import axios from "axios";
// import qs from "qs";

const baseURL = 'https://cnodejs.org/api/v1';

const config = {
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' }
}

const instance = axios.create(config)

instance.interceptors.request.use(req => req, err =>
    // 当请求错误时
    Promise.reject(err)
)

instance.interceptors.response.use(response => response, (err) => {
    // 当返回错误时
    if (axios.isCancel(err)) {
        return Promise.reject(new Error('请求被取消'))
    }
    if ('code' in err && err.code === 'ECONNABORTED') {
        return Promise.reject(new Error('请求超时'))
    }
    return Promise.reject(err)
})

class Http {
    static get(url, params) {
        console.log(params, 'params')
        return new Promise((resolve, reject) => {
            instance.get(url, {
                params: params
            })
                .then(data => {
                    Http.responseFilter(data) ? resolve(data) : reject(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    static post(url, params) {
        return new Promise((resolve, reject) => {
            instance.post(url,
                params
            )
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    static responseFilter(data) {
        switch (data.status) {
            case 200:
                return true;
            case 404:
                // TODO:
                //   router.replace({ name: '404', params: { msg: data.message } })
                return false;
            case 500:
                // TODO:
                // let msg = !IS_DEV ? '系统繁忙' : '系统错误:' + data.message
                // this._toast(msg, 'error')
                return false;
            default:
                return true;
        }
    }
}

export default Http

