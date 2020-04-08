import { getApi, postApi } from '../utils/apiConsumer';
import { URL_GET_TRASH_AREAS, URL_GET_DRIVERS, URL_POST_ASSIGN_TRASH } from '../constants/serverUrl';


export function getTrashAreas(token) {
    return getApi(token, URL_GET_TRASH_AREAS);
}

export function getDrivers(token) {
    return getApi(token, URL_GET_DRIVERS);
}

export function sendDirection(token, body) {
    return postApi(token, URL_POST_ASSIGN_TRASH, body);
}