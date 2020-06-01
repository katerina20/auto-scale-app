import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import AuthReducer from './AuthReducer';
import ItemsReducer from './ItemsReducer';
import ProvidersReducer from './ProvidersReducer';
import TransactionsReducer from './TransactionsReducer';

const reducers = combineReducers({
    form: formReducer,
    auth: AuthReducer,
    items: ItemsReducer,
    providers: ProvidersReducer,
    transactions: TransactionsReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;