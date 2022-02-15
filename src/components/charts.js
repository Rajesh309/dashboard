import React from "react";
import {useDashboardValue} from "../utils/reducer";
export const Charts = () => {
    const [{barData,tableData,pieData},dispatch] = useDashboardValue();

    console.log({barData,tableData,pieData})
    return <div>Charts</div>
}