import React from 'react';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Tabs from '@material-ui/core/Tabs';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import ItemsPageContainer from '../items/ItemsPageContainer';
import ProvidersPageContainer from '../providers/ProvidersPageContainer';
import SalesPageContainer from '../sales/SalesPageContainer';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
};

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: '#F5F5F5'
        },
    },
    grow: {
        flexGrow: 1,
    },
    buttonText: {
        fontSize: '16px',
        textTransform: 'capitalize',
        color: '#F2F2F2',
    },
    bar: {
        flexGrow: 1,
        height: 60,
        boxShadow: 'none',
        background: '#333333'
    },
    paper: {
        backgroundColor: '#F5F5F7',
        padding: theme.spacing(1),
        marginBottom: theme.spacing(2)
    },
    root: {
        flexGrow: 1,
        width: '100%',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
}));

const MainPage = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [cookies, removeCookie] = useCookies(['token']);

    const { authToken } = props;

    if (cookies.token && cookies.token !== 'undefined') {
        props.setAuthToken(cookies.token);
    }

    if (authToken === null && (!cookies.token || cookies.token === 'undefined')) {
        return <Redirect to="/login" />;
    }

    const logout = () => {
        removeCookie('token');
        props.setAuthToken(null);
        window.location.reload(false);
    };

    const handleChange = (event, newValue) => setValue(newValue);

    return (
        <>
            <Box boxShadow={1}>
                <AppBar position="static" className={classes.bar}>
                    <Toolbar id="back-to-top-anchor">
                        Admin Panel
                        <div className={classes.grow} />
                        <Button onClick={logout}>
                            <Typography className={classes.buttonText} variant="h6" noWrap>
                                Logout
                            </Typography>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container
                className={classes.root}
                component="main"
            >
                <Paper>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Items" {...a11yProps(0)} />
                            <Tab label="Providers" {...a11yProps(1)} />
                            <Tab label="Sales" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <ItemsPageContainer />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ProvidersPageContainer />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <SalesPageContainer />
                    </TabPanel>
                </Paper>
            </Container>
        </>
    );
};

export default MainPage;