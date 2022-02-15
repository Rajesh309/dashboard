import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom"
// import {
//   ErrorFallback,
//   PageNotFound,
//   BubbleLoader,
// } from "components/helper_components/";
import { Login } from "../access";
import {DashboardContainer} from "../containers/dashboardContainer";


export const AppRouter = () => {
    console.log('within router')
    return (
        <>
            <Switch>
                <Route exact path = "/" component = {Login} />
                <Route exact path = "/dashboard" component = {DashboardContainer} />
            </Switch>
        </>
    )
}