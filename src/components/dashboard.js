import React,{useEffect,useState}from "react";
import {Backdrop,CircularProgress} from "@mui/material";
import {getRange} from "../utils/api-service";
import {useDashboardValue} from "../utils/reducer";
import {ChartIterator,DateRange} from "../components";
import {Logout} from "../access/logout";
import "./styles.css"
export const Dashboard = () => {

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [{fetchedDateRange,chartsLoading},dispatch] = useDashboardValue();

    const fetchDateRange = async() => {
        setLoading(true);
        let fetchedDateRange = await getRange({
            "organization": "DemoTest",
            "view": "Auction"
          });

        if(fetchedDateRange){
            setLoading(false);
            dispatch({
                type:"SET_FETCHED_DATE",
                payload:fetchedDateRange.result
            })

        } else {
            setLoading(false)
            setError("Error in fetching the timeline range, Please refresh the page");
        }
    }
    useEffect(() => {
        fetchDateRange();
    },[])
    return (
        <>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1,display:"flex",flexDirection:"column" }}
            open={loading}
        >
            <CircularProgress color="inherit" />
            <h5> Fetching timeline range...</h5>
        </Backdrop>

        {
            !error && !loading &&(
                <div id = "dashboard-container">
                    <div id = "logout-container">
                        <Logout/>
                    </div>
                    <div id = "date-range-container">
                        <DateRange defaultDate = {fetchedDateRange}/>
                    </div>
                    <div id = "charts-continer">
                        {chartsLoading ? <div style={{display:"flex",flex:1,justifyContent:"center",alignItems:"center"}}><CircularProgress /></div> : <ChartIterator />}
                    </div>
                </div>
            )
        }
        </>
    )
}