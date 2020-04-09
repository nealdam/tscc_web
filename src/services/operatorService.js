import { getApi, postApi, getImage } from '../utils/apiConsumer';
import { URL_GET_TRASH_AREAS, URL_GET_DRIVERS, URL_POST_ASSIGN_TRASH, URL_GET_IMAGE } from '../constants/serverUrl';

const axios = require('axios').default;

const getImageConfig = {

}


export function getTrashAreas(token) {
    return getApi(token, URL_GET_TRASH_AREAS);
}

export function getDrivers(token) {
    return getApi(token, URL_GET_DRIVERS);
}

export function sendDirection(token, body) {
    return postApi(token, URL_POST_ASSIGN_TRASH, body);
}

export function getImageAPI(token, listImageNames) {
    let requests = [];

    listImageNames.map(imageName => {
        const request = axios.get(`${URL_GET_IMAGE}${imageName}`, {
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
        })

        requests.push(request);
    });

    return axios.all(requests);
}