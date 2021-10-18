import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./Router";
import {AuthContext} from "../context";

const ApplicationRouter = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    return (
        isAuth ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to='/main'/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to='/auth'/>
            </Switch>
    );
};

export default ApplicationRouter;