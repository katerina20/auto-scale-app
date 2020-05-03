import Cookies from 'universal-cookie';
import { ProvidersApi } from '../api/DataAccessLayer';

const SET_PROVIDERS = 'providers/SET_PROVIDERS';

const initialState = {
    providers: []
};

const providersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROVIDERS:
            return { ...state, providers: action.providers };
        default:
            return state;
    }
};

export const setProviders = (providers) => ({ type: SET_PROVIDERS, providers });

export const getProviders = () => async (dispatch, getState) => {
    try {
        let res = await ProvidersApi.getAllProviders(getState().auth.authToken);
        console.log(res);
        res = res.data;
        dispatch(setProviders(res));
    } catch (err) {
        if (!err.response) {
            return alert('Server connection error');
        } else {
            if (err.response.status === 403) {
                new Cookies().remove('token');
                window.location.reload(false);
            } else {
                return alert('Something wrong');
            }
        }
    }
};

export default providersReducer;