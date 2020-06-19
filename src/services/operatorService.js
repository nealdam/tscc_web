import { URL_GET_DRIVERS, URL_GET_IMAGE, URL_GET_TRASH_AREAS, URL_POST_ASSIGN_TRASH, URL_GET_COLLECT_JOB_BY_DATE, URL_GET_GENERATE_STATUS, URL_GENERATE_TRASH_AREAS, URL_CANCEL_TRASH_AREA, URL_UPDATE_TRASH_AREA } from '../constants/serverUrl';

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

export function generateTrashAreas(token) {
    return axios.get(URL_GENERATE_TRASH_AREAS, getConfig(token));
}

export function cancelTrashArea(token, id) {
    let url = URL_CANCEL_TRASH_AREA + id;

    return axios.delete(url, getConfig(token));
}

export function getGenerateStatus(token) {
    return axios.get(URL_GET_GENERATE_STATUS, getConfig(token));
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

export function getCollectJobByDate(token, date) {

    var byDate = new Date(date.getTime());

    byDate.setHours(+7);
    byDate.setMinutes(0);
    byDate.setSeconds(1);
    byDate.setMilliseconds(0);

    let url = `${URL_GET_COLLECT_JOB_BY_DATE}/${byDate.toISOString()}`;

    return axios.get(url, getConfig(token));
}

export function updateTrashArea(token, id, size, width) {

    let url = `${URL_UPDATE_TRASH_AREA}/${id}`;

    return axios.put(url, { size, width }, getConfig(token));
}