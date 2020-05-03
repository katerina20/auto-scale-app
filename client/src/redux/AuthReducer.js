import Cookies from 'universal-cookie';
import { stopSubmit } from 'redux-form';
import { AuthApi } from '../api/DataAccessLayer';

const SET_AUTH_TOKEN = 'auth/SET_AUTH_TOKEN';

const initialState = {
    authToken: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKEN:
            return { ...state, authToken: action.authToken };
        default:
            return state;
    }
};

export const setAuthToken = (authToken) => ({ type: SET_AUTH_TOKEN, authToken });

export const login = (login, password) => async (dispatch) => {
    try {
        let res = await AuthApi.login(login, password);
        console.log(res);
        res = res.data;
        if (res.accessToken) {
            new Cookies().set('token', res.accessToken, { path: '/' });
            dispatch(setAuthToken(res.accessToken));
        }
    } catch (err) {
        if (!err.response) {
            return alert('Server connection error');
        } else {
            const error = err.response.data.error;
            console.log(error);
            if (error) {
                dispatch(stopSubmit('login', { _error: error }));
            } else {
                dispatch(stopSubmit('login', { _error: 'Something wrong' }));
            }
        }
    }
};

export default authReducer;