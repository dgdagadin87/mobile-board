import {
    REGISTER_LOGIN_CHANGE,
    REGISTER_PASSWORD_CHANGE,
    REGISTER_NAME_CHANGE,
    REGISTER_MAIL_CHANGE,
    REGISTER_USER_DATA_AGREEENT_CHANGE,
    REGISTER_USER_OFFER_AGREEMENT_CHANGE
 } from '../constants';

export function changeLogin(login: string) {
    return {
        type: REGISTER_LOGIN_CHANGE,
        payload: login
    }
};

export function changePassword(password: string) {
    return {
        type: REGISTER_PASSWORD_CHANGE,
        payload: password
    }
};

export function changeName(name: string) {
    return {
        type: REGISTER_NAME_CHANGE,
        payload: name
    }
};

export function changeMail(mail: string) {
    return {
        type: REGISTER_MAIL_CHANGE,
        payload: mail
    }
};

export function changeUserDataAgreement(value: boolean) {
    return {
        type: REGISTER_USER_DATA_AGREEENT_CHANGE,
        payload: value
    }
};

export function changeUserOfferAgreement(value: boolean) {
    return {
        type: REGISTER_USER_OFFER_AGREEMENT_CHANGE,
        payload: value
    }
};