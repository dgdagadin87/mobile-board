import { createStore, combineReducers } from 'redux';
import loginReducer from '../reducers/loginReducer';
import registerReducer from '../reducers/registerReducer';

const rootReducer = combineReducers(
    {
        loginData: loginReducer,
        registerData: registerReducer,
    }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;