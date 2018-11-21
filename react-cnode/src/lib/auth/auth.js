import cookie from './cook';
import session from './session';
import Http from '../service/http';

const TOKEN_KEY = "token";
const USER_INFO_KEY = "USER_INFO_KEY";
const PREV_TOKEN_KEY = "token";

export function getToken() {
    return session.get(PREV_TOKEN_KEY);
}

export function setAuth(token, userInfo) {
    if (!token) return undefined;
    cookie.set(TOKEN_KEY, token);
    session.set(TOKEN_KEY, token);
    if (!userInfo) return undefined;
    session.set(USER_INFO_KEY, userInfo);
    session.set("userInfo", userInfo);
}

export function setToken(token) {
    cookie.set(TOKEN_KEY, token);
    session.set(TOKEN_KEY, token);
}

export function getUserInfo() {
    const userInfo = session.get(USER_INFO_KEY);
    if (!userInfo) return session.get("userInfo");
    return userInfo;
}

export function isLogin() {

    const token = getToken();
    if (!token) return Promise.reject(new Error('not login'));
    return new Promise((resolve, reject) => {
        // Http.post('/getToken', { token })
        //     .then(res => {
        //         resolve()
        //     })
        //     .catch(err => {
        //         reject(err);
        //     })
        resolve();
    })
}

export function goLogin(next = window.location.href) {
    window.location.href = `/account.html?next=${encodeURIComponent(next)}`;
}

// const MAX_GET_TOKEN_RETRY_TIMES = 150;

// function getTimerToken(callback, reject) {
//   let times = 0;
//   const timer = setInterval(() => {
//     const token = getToken();
//     times += 1;
//     if (!token && times === MAX_GET_TOKEN_RETRY_TIMES) {
//       return reject({ code: "40001" });
//     }
//     if (token || times >= 50) {
//       callback(token);
//       clearInterval(timer);
//     }
//   }, 20);
// }