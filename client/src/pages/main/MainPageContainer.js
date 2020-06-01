import MainPage from './MainPage';
import { connect } from 'react-redux';
import { setAuthToken } from '../../redux/AuthReducer';

const mapStateToProps = (state) => ({
    authToken: state.auth.authToken,
});

export default connect(mapStateToProps, {
    setAuthToken,
})(MainPage);