import AuthPage from './AuthPage';
import { connect } from 'react-redux';
import { login } from '../../redux/AuthReducer';

const mapStateToProps = (state) => ({
    authToken: state.auth.authToken,
    errorMessage: state.auth.errorMessage
});

export default connect(mapStateToProps, { login })(AuthPage);