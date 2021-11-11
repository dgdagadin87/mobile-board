import { createStore, combineReducers } from 'redux';
import mainReducer from '../reducers/mainReducer';
import loginReducer from '../reducers/loginReducer';
import registerReducer from '../reducers/registerReducer';

const rootReducer = combineReducers(
    {
        loginData: loginReducer,
        registerData: registerReducer,
        mainData: mainReducer,
    }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;
