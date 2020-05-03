import Cookies from 'universal-cookie';
import { ItemsApi } from '../api/DataAccessLayer';

const SET_ITEMS = 'items/SET_ITEMS';
const SET_STATS = 'items/SET_STATS';

const initialState = {
    items: [],
    stats: []
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ITEMS:
            return { ...state, items: action.items };
        case SET_STATS:
            return { ...state, stats: action.stats };
        default:
            return state;
    }
};

export const setItems = (items) => ({ type: SET_ITEMS, items });
export const setStats = (stats) => ({ type: SET_STATS, stats });

export const getItems = () => async (dispatch, getState) => {
    try {
        let res = await ItemsApi.getAllItems(getState().auth.authToken);
        console.log(res);
        res = res.data;
        dispatch(setItems(res));
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

export const addSupply = (item, weight) => async (dispatch, getState) => {
    try {
        let res = await ItemsApi.addSupply(item, weight, getState().auth.authToken);
        console.log(res);
        res = res.data;
        // TODO: find and update item
        // dispatch(setItems(res));
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

export const updateItem = (item) => async (dispatch, getState) => {
    try {
        const items = getState().items.items;
        const providers = getState().providers.providers;
        const itemIndex = items.findIndex(item => item.id === item.id);
        const providerIndex = providers.findIndex(provider => provider.id === +item.providerId);
        if (itemIndex < 0 || providerIndex < 0) {
            return alert('Something wrong');
        }
        debugger;
        const newItem = items[itemIndex];
        newItem.price = +item.price;
        newItem.amount = +item.amount;
        newItem.providerId = +item.providerId;
        newItem.provider = providers[providerIndex];

        debugger;
        let res = await ItemsApi.updateItem(item, getState().auth.authToken);
        console.log(res);
        res = res.data;
        debugger;
        dispatch(setItems([...items.slice(0, itemIndex), newItem, ...items.slice(itemIndex + 1)]));
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

export const getStats = (itemId) => async (dispatch, getState) => {
    try {
        let res = await ItemsApi.getItemStatsById(itemId, getState().auth.authToken);
        console.log(res);
        res = res.data;
        dispatch(setStats(res));
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

export default itemsReducer;