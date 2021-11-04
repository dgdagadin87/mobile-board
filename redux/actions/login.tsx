import { LOGIN_CHANGE, PASSWORD_CHANGE } from '../constants';

export function changeLogin(login: string) {
    return {
        type: LOGIN_CHANGE,
        payload: login
    }
};

export function changePassword(password: string) {
    return {
        type: PASSWORD_CHANGE,
        payload: password
    }
};