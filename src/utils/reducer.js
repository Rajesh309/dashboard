import React, {createContext,useContext} from "react";

export const DashboardContext = createContext();
export const useDashboardValue = () => useContext(DashboardContext);


export const reducer = (state,action) => {
    switch(action.type){
        case "SET_FETCHED_DATE" :  {
            return {
                ...state,
                fetchedDateRange : action.payload
            }
        }

        case "SET_BAR_DATA" : {
            return {
                ...state,
                barData : action.payload
            }
        }

        case "SET_PIE_DATA" : {
            return {
                ...state,
                pieData : action.payload
            }
        }
        case "SET_TABLE_DATA" : {
            return {
                ...state,
                tableData : action.payload
            }
        }
    }
}
export const initialState = {
    fetchedDateRange : {
        startDate : null,
        endDate : null
    },
    selectedDateRange : {
        startDate : null,
        endDate : null
    },
    barData : [],
    tableData : [],
    pieData : []
}