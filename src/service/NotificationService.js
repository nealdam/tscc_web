import { infoNotify, successNotify, errorNotify, warningNotify, defaultNotify } from "../constants/notistackOption";

export function handleComingNotification(message, enqueueSnackbar) {
    console.log(message);

    const title = message.data['firebase-messaging-msg-data'].notification.title;
    const type = message.data['firebase-messaging-msg-data'].data['google.c.a.c_l'];

    console.log("title: " + title);
    console.log("type: " + type);

    switch(type) {
        case 'INFO':
            enqueueSnackbar(title, infoNotify);
            break;
        case 'SUCCESS':
            enqueueSnackbar(title, successNotify);
            break;
        case 'ERROR':
            enqueueSnackbar(title, errorNotify);
            break;
        case 'WARNING':
            enqueueSnackbar(title, warningNotify);
            break;
        default:
            enqueueSnackbar(title, defaultNotify);
            break;
    }
}