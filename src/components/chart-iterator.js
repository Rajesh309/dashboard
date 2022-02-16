import React,{useEffect,useState} from "react";
import {Card} from "@mui/material";
import {Adapter} from "./helper-components/adapter";
import {useDashboardValue} from "../utils/reducer";
import {Chart} from "./chart-components/chart";
import './styles.css';
export const ChartIterator = () => {
    const [{barData,tableData,pieData},dispatch] = useDashboardValue();
    const [chartsArr,setChartsArr] = useState([])
    
    const initData = () => {
        let chartsArr = [{
            type :"Bar",
            actualData : barData
        },
        {
            type :"Pie",
            actualData : pieData
        },
        {
            type :"Table",
            actualData : tableData
        }
        ];
        setChartsArr(chartsArr)
    }

    useEffect(() => {
        initData();
    },[barData,pieData,tableData])

    return (
    <div id = "iterator-main">
        { chartsArr.length > 0 &&
            chartsArr.map((eachData) => {
                if(eachData.actualData.length > 0) {
                    let data = Adapter(eachData);
                    return (
                        <Card id ="card" raised = {true}>
                            <Chart data = {data} plotId = {eachData.type} /> 
                        </Card>
                    )
                } 
            })
        }
    </div>
    )
}