import NotFound from 'components/NotFound';
import Login from 'features/Auth/pages/Login';
import Register from 'features/Auth/pages/Register';
import MainPage from 'features/Chat/pages/MainPage';
import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './route/PrivateRoute';
import PublicRoute from './route/PublicRoute';

const router = (
    <Switch>
        <PrivateRoute exact path="/" component={MainPage} />
        <PrivateRoute exact path="/chatroom/:id" component={MainPage} />
        <PublicRoute restricted={true} exact path="/login" component={Login} />
        <PublicRoute restricted={true} exact path="/register" component={Register} />
        <PublicRoute component={NotFound} />
    </Switch>
);

export default router;