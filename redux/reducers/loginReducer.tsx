import { LOGIN_CHANGE, PASSWORD_CHANGE } from '../constants';

const initialState = {
    login: '',
    password: '',
};

const loginReducer = (state = initialState, action: any) => {
    switch(action.type) {
        case LOGIN_CHANGE:
            return {
                ...state,
                login: action.payload
            };

        case PASSWORD_CHANGE:
            return {
                ...state,
                password: action.payload
            };

        default:
            return state;
    }
}
export default loginReducer;