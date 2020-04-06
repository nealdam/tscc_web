import { getApi } from '../utils/apiConsumer';
import { URL_GET_TRASH_AREAS, URL_GET_DRIVERS } from '../constants/serverUrl';


export function getTrashAreas(token) {
    return getApi(token, URL_GET_TRASH_AREAS);
}

export function getDrivers(token) {
    return getApi(token, URL_GET_DRIVERS);
}