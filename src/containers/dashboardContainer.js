import React,{useEffect,useReducer} from "react";
import {
    DashboardContext,
    initialState,
    reducer
  } from "../utils/reducer";
import {Dashboard} from "../components";

export const DashboardContainer = () => {
    return (
            <DashboardContext.Provider value = {useReducer(reducer, initialState)}>
                <Dashboard />
            </DashboardContext.Provider>
    )
}