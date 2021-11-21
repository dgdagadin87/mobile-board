import {
    NEW_VIDEO_SET_VIDEO_DATA,
    SEND_ADDED_VIDEO_NAME,
    SEND_ADDED_VIDEO_DESCRIPTION
} from '../constants';

const initialState = {
    video: {},
    videoName: '',
    videoDescription: ''
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

        default:
            return state;
    }
}
export default newVideoReducer;
