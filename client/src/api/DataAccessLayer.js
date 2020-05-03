import axios from 'axios';

export const DOMAIN = '/api';
const instance = axios.create({ baseURL: DOMAIN });

export const AuthApi = {
    login(login, password) {
        return instance.post('/sign', { login, password });
    }
};

export const ItemsApi = {
    getAllItems(token) {
        return instance.get('/items', {
            headers: { 'Authorization': token },
        });
    },
    addSupply(item, weight, token) {
        return instance.put('/items/add', { item, weight },
            { headers: { 'Authorization': token } }
        );
    },
    updateItem(item, token) {
        return instance.put('/items', { item },
            { headers: { 'Authorization': token } }
        );
    },
    getItemStatsById(id, token) {
        return instance.get(`/items/stat/${id}`, {
            headers: { 'Authorization': token },
        });
    }
};

export const ProvidersApi = {
    getAllProviders(token) {
        return instance.get('/providers', {
            headers: { 'Authorization': token },
        });
    },
    addProvider(provider, token) {
        return instance.post('/providers', { provider },
            { headers: { 'Authorization': token } }
        );
    },
    updateProvider(provider, token) {
        return instance.put('/providers', { provider },
            { headers: { 'Authorization': token } }
        );
    }
};

export const TransactionsApi = {
    getAllInTransactions(token) {
        return instance.get('/transactions/in', {
            headers: { 'Authorization': token },
        });
    },
    getAllOutTransactions(token) {
        return instance.get('/transactions/out',
            { headers: { 'Authorization': token } }
        );
    },
    getTransactionsStats(token) {
        return instance.get('/transactions/stat',
            { headers: { 'Authorization': token } }
        );
    }
};
