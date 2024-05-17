import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import formReducer from './formReducer';

const store = configureStore({
    reducer: {
        auth : authSlice,
        form : formReducer
    }
});


export default store;