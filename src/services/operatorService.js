import { getApi } from '../utils/apiConsumer';
import { URL_GET_STREET_ROUTES } from '../constants/serverUrl';


export function getStreetRoute(token) {
    return getApi(token, URL_GET_STREET_ROUTES)
}