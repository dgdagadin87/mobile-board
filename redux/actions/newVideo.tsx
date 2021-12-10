import {
    NEW_VIDEO_SET_VIDEO_DATA,
    SEND_ADDED_VIDEO_NAME,
    SEND_ADDED_VIDEO_DESCRIPTION,
    SEND_ADDED_VIDEO_FILM_NAME,
    SEND_ADDED_VIDEO_EFIR_DATE,
    SEND_ADDED_VIDEO_COUNTRY_CITY_FROM,
    SEND_ADDED_VIDEO_ACTIVITY_TYPE,
    SEND_ADDED_VIDEO_FORM_EMPTY,
} from '../constants';

export function setVideoData(videoData: any) {
    return {
        type: NEW_VIDEO_SET_VIDEO_DATA,
        payload: videoData
    };
};

export function setVideoName(name: string) {
    return {
        type: SEND_ADDED_VIDEO_NAME,
        payload: name
    };
};

export function setVideoDescription(description: string) {
    return {
        type: SEND_ADDED_VIDEO_DESCRIPTION,
        payload: description
    };
};

export function setFilmName(filmName: string) {
    return {
        type: SEND_ADDED_VIDEO_FILM_NAME,
        payload: filmName
    };
}

export function setEfirDate(efirDate: string) {
    return {
        type: SEND_ADDED_VIDEO_EFIR_DATE,
        payload: efirDate
    };
}

export function setCountryCityFrom(countryCityFrom: string) {
    return {
        type: SEND_ADDED_VIDEO_COUNTRY_CITY_FROM,
        payload: countryCityFrom
    };
}

export function setActivityType(activityType: string) {
    return {
        type: SEND_ADDED_VIDEO_ACTIVITY_TYPE,
        payload: activityType
    };
}

export function setEmptyAddVideoForm() {
    return {
        type: SEND_ADDED_VIDEO_FORM_EMPTY,
        payload: null
    };
}
