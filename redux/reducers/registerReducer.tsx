import {
    REGISTER_LOGIN_CHANGE,
    REGISTER_PASSWORD_CHANGE,
    REGISTER_NAME_CHANGE,
    REGISTER_MAIL_CHANGE,
    REGISTER_USER_DATA_AGREEENT_CHANGE,
    REGISTER_USER_OFFER_AGREEMENT_CHANGE
} from '../constants';

const initialState = {
    login: '',
    password: '',
    name: '',
    mail: '',
    userDataAgreement: false,
    userOfferAgreement: false,
};

const registerReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case REGISTER_LOGIN_CHANGE:
            return {
                ...state,
                login: action.payload
            };

        case REGISTER_PASSWORD_CHANGE:
            return {
                ...state,
                password: action.payload
            };

        case REGISTER_NAME_CHANGE:
            return {
                ...state,
                name: action.payload
            };

        case REGISTER_MAIL_CHANGE:
            return {
                ...state,
                mail: action.payload
            };

        case REGISTER_USER_DATA_AGREEENT_CHANGE:
            return {
                ...state,
                userDataAgreement: action.payload
            };

        case REGISTER_USER_OFFER_AGREEMENT_CHANGE:
            return {
                ...state,
                userOfferAgreement: action.payload
            };

        default:
            return state;
    }
}
export default registerReducer;