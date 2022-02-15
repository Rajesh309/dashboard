import React,{useEffect,useState,useReducer}from "react";
import {FormControl,FormControlLabel,TextField,Divider, Checkbox, Button,Backdrop,Snackbar,CircularProgress,Alert} from "@mui/material";
import {getRange} from "../utils/api-service";
import {useDashboardValue} from "../utils/reducer";
import {DateRange,Charts} from "../components";
import {Logout} from "../access/logout";
export const Dashboard = () => {

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [{fetchedDateRange},dispatch] = useDashboardValue();

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
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
            <h5> Fetching timeline range...</h5>
        </Backdrop>

        {
            !error && !loading &&(
                <div style ={{display:"flex",flexDirection:"column",flex:1,gap:"0.8rem"}}>
                    <div style = {{display:"flex",flexShrink:1,minHeight:"64px",backgroundColor:"", justifyContent:"flex-end",marginRight:"0.8rem"}}>
                        <Logout/>
                    </div>
                    <div style = {{display:"flex",flexShrink:1,minHeight:"64px"}}>
                        <DateRange defaultDate = {fetchedDateRange}/>
                    </div>
                    <div style = {{display:"flex",flex:10}}>
                        <Charts/>
                    </div>
                </div>
            )
        }
        </>
    )
}