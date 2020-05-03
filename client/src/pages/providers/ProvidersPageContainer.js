import ProvidersPage from './ProvidersPage';
import { connect } from 'react-redux';
import { getProviders, addProvider, updateProvider } from '../../redux/ProvidersReducer';
import { getAllInTransactionsFromApi } from '../../redux/TransactionsReducer';

const mapStateToProps = (state) => ({
    providers: state.providers.providers,
    transactions: state.transactions.transactions
});

export default connect(mapStateToProps, {
    getProviders,
    addProvider,
    updateProvider,
    getAllInTransactionsFromApi
})(ProvidersPage);