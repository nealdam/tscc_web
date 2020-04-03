import { getApi } from '../utils/apiConsumer';
import { URL_GET_STREET_ROUTES } from '../constants/serverUrl';


export async function getStreetRoute(token) {
    await getApi(token, URL_GET_STREET_ROUTES)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("Error during fetch street route");
            console.log(error);
        })
}