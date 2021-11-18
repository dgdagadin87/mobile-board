import { NEW_VIDEO_SET_VIDEO_DATA } from '../constants';

export function setVideoData(videoData: any) {
    return {
        type: NEW_VIDEO_SET_VIDEO_DATA,
        payload: videoData
    };
};
