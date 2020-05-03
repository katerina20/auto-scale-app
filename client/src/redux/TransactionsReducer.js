import Cookies from 'universal-cookie';
import { TransactionsApi } from '../api/DataAccessLayer';

const SET_TRANSACTIONS = 'transactions/SET_TRANSACTIONS';
const SET_STATS_TRANSACTIONS = 'transactions/SET_STATS_TRANSACTIONS';

const initialState = {
    transactions: [],
    statsTransactions: []
};

const providersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TRANSACTIONS:
            return { ...state, transactions: [...action.transactions] };
        case SET_STATS_TRANSACTIONS:
            return { ...state, statsTransactions: action.statsTransactions };
        default:
            return state;
    }
};

export const setTransactions = (transactions) => ({ type: SET_TRANSACTIONS, transactions });

export const setStatsTransactions = (statsTransactions) => ({ type: SET_STATS_TRANSACTIONS, statsTransactions });

export const getAllInTransactionsFromApi = () => async (dispatch, getState) => {
    try {
        let res = await TransactionsApi.getAllInTransactions(getState().auth.authToken);
        console.log(res);
        res = res.data;
        dispatch(setTransactions(res));
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

export const getAllOutTransactionsFromApi = () => async (dispatch, getState) => {
    try {
        let res = await TransactionsApi.getAllOutTransactions(getState().auth.authToken);
        console.log(res);
        res = res.data;
        dispatch(setTransactions(res));
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

export const getTransactionsStatsFromApi = () => async (dispatch, getState) => {
    try {
        let res = await TransactionsApi.getTransactionsStats(getState().auth.authToken);
        console.log(res);
        res = res.data;
        dispatch(setStatsTransactions(res));
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