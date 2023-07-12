import React from "react";
import { Route, Redirect } from "react-router-dom";
export default function PrivateRoutes({
    component: Component,
    ...rest
}) {
    const isAuthenticated = localStorage.getItem('user');
    return (
        <Route
            {...rest}
            render={(props) => {
                return isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />;
            }}
        ></Route>
    );
}