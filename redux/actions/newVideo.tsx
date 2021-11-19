import { NEW_VIDEO_SET_VIDEO_DATA, SEND_ADDED_VIDEO_NAME, SEND_ADDED_VIDEO_DESCRIPTION } from '../constants';

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
