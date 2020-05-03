import ItemsPage from './ItemsPage';
import { connect } from 'react-redux';
import { getProviders } from '../../redux/ProvidersReducer';
import {
    getItems,
    updateItem,
    getStats,
    addSupply,
} from '../../redux/ItemsReducer';

const mapStateToProps = (state) => ({
    items: state.items.items,
    providers: state.providers.providers,
    stats: state.items.stats,
    statsItem: state.items.statsItem,
});

export default connect(mapStateToProps, {
    getItems,
    updateItem,
    getProviders,
    getStats,
    addSupply,
})(ItemsPage);