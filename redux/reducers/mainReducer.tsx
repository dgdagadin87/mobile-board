import { MAIN_SET_USER_DATA, MAIN_SET_USER_VIDEO_LIST } from '../constants';

export interface VideoCdn {
    id: string,
    name: string,
    description: string,
    cdn_url: string,
    content_type: string,
    create_date: string,
    previews: string[],
    size: number,
    video: string,
}

export interface VideoItem {
    date: string,
    description: string,
    name: string,
    status: string,
    uploaded_at: string,
    user_id: string,
    cdn?: VideoCdn,
};

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
