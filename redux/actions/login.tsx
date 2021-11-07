import { LOGIN_LOGIN_CHANGE, LOGIN_PASSWORD_CHANGE } from '../constants';

export function changeLogin(login: string) {
    return {
        type: LOGIN_LOGIN_CHANGE,
        payload: login
    }
};

export function changePassword(password: string) {
    return {
        type: LOGIN_PASSWORD_CHANGE,
        payload: password
    }
};