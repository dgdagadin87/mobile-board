import { createStore, combineReducers } from 'redux';
import mainReducer from '../reducers/mainReducer';
import newVideoReducer from '../reducers/newVideoReducer';
import loginReducer from '../reducers/loginReducer';
import registerReducer from '../reducers/registerReducer';

const rootReducer = combineReducers(
    {
        loginData: loginReducer,
        registerData: registerReducer,
        mainData: mainReducer,
        newVideoData: newVideoReducer,
    }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;
