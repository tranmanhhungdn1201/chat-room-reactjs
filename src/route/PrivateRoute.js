import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from 'utils/auth';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => {

            return isLogin() ?
                <Component {...props} />
            : <Redirect to={{
                pathname: "/login",
                state: { from: props.location }
            }} />
        }} />
    );
};

export default PrivateRoute;