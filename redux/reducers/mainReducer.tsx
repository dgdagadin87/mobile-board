import { MAIN_SET_USER_DATA, MAIN_SET_USER_VIDEO_LIST } from '../constants';

const initialState = {
    user: {
        key: '',
        created_at: '',
        email: '',
        is_active: '',
        is_staff: '',
        is_superuser: false,
        personal_data: false,
        user_agreement: false,
        username: '',
    },
    videos: []
};

const mainReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case MAIN_SET_USER_DATA:
            return {
                ...state,
                user: action.payload
            };

        case MAIN_SET_USER_VIDEO_LIST:
            return {
                ...state,
                videos: action.payload
            };

        default:
            return state;
    }
}
export default mainReducer;
