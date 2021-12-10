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

const initialState = {
    video: {},
    videoName: '',
    filmName: '',
    efirDate: '',
    videoDescription: '',
    countryCityFrom: '',
    activityType: '',
};

const newVideoReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case NEW_VIDEO_SET_VIDEO_DATA:
            return {
                ...state,
                video: action.payload
            };

        case SEND_ADDED_VIDEO_NAME:
            return {
                ...state,
                videoName: action.payload
            };

        case SEND_ADDED_VIDEO_DESCRIPTION:
            return {
                ...state,
                videoDescription: action.payload
            };

        case SEND_ADDED_VIDEO_FILM_NAME:
            return {
                ...state,
                filmName: action.payload
            };

        case SEND_ADDED_VIDEO_EFIR_DATE:
            return {
                ...state,
                efirDate: action.payload
            };

        case SEND_ADDED_VIDEO_COUNTRY_CITY_FROM:
            return {
                ...state,
                countryCityFrom: action.payload
            };

        case SEND_ADDED_VIDEO_ACTIVITY_TYPE:
            return {
                ...state,
                activityType: action.payload
            };

        case SEND_ADDED_VIDEO_FORM_EMPTY:
            return {
                ...state,
                videoName: '',
                filmName: '',
                efirDate: '',
                videoDescription: '',
                countryCityFrom: '',
                activityType: '',
            };

        default:
            return state;
    }
}
export default newVideoReducer;
