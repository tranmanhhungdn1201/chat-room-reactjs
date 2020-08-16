import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axiosClient from 'api/axiosClient';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => {
            return axiosClient.isLogin() && restricted ?
            <Redirect to="/" />
        : <Component {...props} />
        }} />
    );
};

export default PublicRoute;