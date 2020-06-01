import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AuthPageContainer from './pages/auth/AuthPageContainer';
import MainPageContainer from './pages/main/MainPageContainer';

const App = () => {
    return (
        <CookiesProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={() => <AuthPageContainer />} />
                    <Route path="/" component={() => <MainPageContainer />} />
                </Switch>
            </BrowserRouter>
        </CookiesProvider>
    );
};

export default App;