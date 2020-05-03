import SalesPage from './SalesPage';
import { connect } from 'react-redux';
import { getProviders } from '../../redux/ProvidersReducer';
import { getAllOutTransactionsFromApi, getTransactionsStatsFromApi } from '../../redux/TransactionsReducer';

const mapStateToProps = (state) => ({
    transactions: state.transactions.transactions,
    statsTransactions: state.transactions.statsTransactions
});

export default connect(mapStateToProps, {
    getAllOutTransactionsFromApi,
    getTransactionsStatsFromApi
})(SalesPage);