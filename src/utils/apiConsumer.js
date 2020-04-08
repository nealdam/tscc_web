// import axios from "axios";

const axios = require('axios').default;

export function getApi(token, url) {
    return axios({
        method: 'get',
        url: url,
        headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`
        }
    })
}

export function postApi(token, url, body) {
    return axios({
        method: "post",
        url: url,
        headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`
        },
        data: body
    })
}