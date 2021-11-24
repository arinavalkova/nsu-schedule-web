import React, {useContext, useState} from 'react';
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./Router";
import {GreetPath, MainPath} from "../Consts";
import {getScheduleFromServer} from "../ServerApi";
import {AuthContext} from "../context";

const ApplicationRouter = () => {

    const {isAuth} = useContext(AuthContext)
    const [isAuthValue, setIsAuthValue] = isAuth;

    return (
        isAuthValue == "true" ?
            <Switch>
                {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Redirect to={MainPath}/>
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
                <Redirect to={GreetPath}/>
            </Switch>
    );
};

export default ApplicationRouter;