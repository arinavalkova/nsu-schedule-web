import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { publicRoutes } from "./Router";
import { GreetPath } from "../Consts";

const ApplicationRouter = () => {
    return <Switch>
        {publicRoutes.map(route =>
            <Route
                component={route.component}
                path={route.path}
                exact={route.exact}
                key={route.path}/>
        )}
        <Redirect to={GreetPath}/>
    </Switch>
}

export default ApplicationRouter;