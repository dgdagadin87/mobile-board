import {
    NEW_VIDEO_SET_VIDEO_DATA,
    SEND_ADDED_VIDEO_NAME,
    SEND_ADDED_VIDEO_DESCRIPTION
} from '../constants';

const initialState = {
    video: {}
};

const newVideoReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case NEW_VIDEO_SET_VIDEO_DATA:
            return {
                ...state,
                video: action.payload
            };

        default:
            return state;
    }
}
export default newVideoReducer;
