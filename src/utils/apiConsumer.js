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