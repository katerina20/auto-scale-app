import React from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fingerprint from '@material-ui/icons/Fingerprint';
import SignInPageValidationForm from './validation/SignInPageValidationForm';

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: '#F5F5F5'
        },
    },
    paper: {
        marginTop: theme.spacing(15),
        padding: theme.spacing(5),
        paddingTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    }
}));

const AuthPage = (props) => {
    const classes = useStyles();
    const [cookies] = useCookies(['auth']);

    const onSubmitLogin = (formData) => {
        props.login(formData.login, formData.password);
    };

    if ((cookies.token && cookies.token !== 'undefined') || (props.authToken && props.authToken !== 'undefined')) {
        return <Redirect to="/" />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Fingerprint />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {'Sign In'}
                </Typography>
                <SignInPageValidationForm onSubmit={onSubmitLogin} />
            </Paper>
        </Container>
    );
};

export default AuthPage;