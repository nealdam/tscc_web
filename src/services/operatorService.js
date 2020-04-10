import { URL_GET_DRIVERS, URL_GET_IMAGE, URL_GET_TRASH_AREAS, URL_POST_ASSIGN_TRASH } from '../constants/serverUrl';

const axios = require('axios').default;

const getImageConfig = (token) => {
    return {
        responseType: 'arraybuffer',
        headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`
        },
        transformResponse: [(data) => {
            const base64 = btoa(
                new Uint8Array(data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            );

            const src = `data:;base64,${base64}`;

            return src;
        }]
    }
}

const getConfig = (token) => {
    return {
        headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`
        }
    }
}

const postConfig = (token) => {
    return {
        headers: {
            Accept: '*/*',
            Authorization: `Bearer ${token}`
        }
    }
}


export function getTrashAreas(token) {
    return axios.get(URL_GET_TRASH_AREAS, getConfig(token));
}

export function getDrivers(token) {
    return axios.get(URL_GET_DRIVERS, getConfig(token));
}

export function sendDirection(token, data) {
    return axios.post(URL_POST_ASSIGN_TRASH, data, postConfig(token));
}

export function getImageAPI(token, listImageNames) {
    let requests = [];

    listImageNames.map(imageName => {
        const request = axios.get(`${URL_GET_IMAGE}${imageName}`, getImageConfig(token));

        requests.push(request);
    });

    return axios.all(requests);
}