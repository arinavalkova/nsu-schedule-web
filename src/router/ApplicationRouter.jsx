import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./Router";
import {AuthContext} from "../context";

const ApplicationRouter = () => {
    const {isAuth} = useContext(AuthContext)
    return (
        isAuth ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Redirect to='/error'/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                    />
                )}
                <Redirect to='/error'/>
            </Switch>
    );
};

export default ApplicationRouter;