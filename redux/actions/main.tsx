import { MAIN_SET_USER_DATA, MAIN_SET_USER_VIDEO_LIST } from '../constants';

export function setUserData(userData: any) {
    return {
        type: MAIN_SET_USER_DATA,
        payload: userData
    };
};

export function setVideosList(videos: any[]) {
    return {
        type: MAIN_SET_USER_VIDEO_LIST,
        payload: videos
    };
};
