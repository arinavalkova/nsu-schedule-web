import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "./Router";
import {GroupContext} from "../context";
import {AuthPath, MainPath} from "../Consts";

const ApplicationRouter = () => {
    const {group, setGroup} = useContext(GroupContext)

    return (
        group ?
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
                <Redirect to={AuthPath}/>
            </Switch>
    );
};

export default ApplicationRouter;