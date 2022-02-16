import React,{useEffect,useState,useCallback} from "react";
import {Button,TextField,Tooltip,Icon} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {useDashboardValue} from "../utils/reducer";
import {getAllCharts} from "../utils/api-service";
import "./styles.css";

export const DateRange = () => {
const [{fetchedDateRange},dispatch] = useDashboardValue();
  const [dateValue, setDateValue] = useState(fetchedDateRange);
  const endDisabled = () => !dateValue?.startDate;

  const handleChange = (newValue,type) => {
    let selectedDate = new Date(newValue);
    let epochTime = selectedDate.getTime();
    if(type === "start") {
        setDateValue((preValue) => {
            return {
                startDate : ""+epochTime,
                endDate : fetchedDateRange?.endDate
            }
        })
    }
    else {
        setDateValue((preValue) => {
            return {
                ...preValue,
                endDate : ""+epochTime
            }
        })
    }
  }

  const fetchMinDate = () => {
    if(!!dateValue?.startDate){
        let currentStartDate = new Date(+dateValue?.startDate);
        let nextDate = currentStartDate.setDate(currentStartDate.getDate() + 1);
        console.log('new Date(+fetchedDateRange.startDate)',new Date(+fetchedDateRange.startDate))
        console.log("nextDate",nextDate)
        return new Date(nextDate);
    }
    else {
        return new Date(+fetchedDateRange?.startDate)
    }
  }

  const handleView = useCallback(async () => {
    dispatch({
      type:"SET_CHARTS_LOADING",
      payload:true
    });
    let charts = await getAllCharts(dateValue)
    dispatch({
        type : "SET_TABLE_DATA",
        payload : charts[0]
    })
    dispatch({
        type : "SET_BAR_DATA",
        payload : charts[1]
    })
    dispatch({
        type : "SET_PIE_DATA",
        payload : charts[2]
    })

    dispatch({
      type:"SET_CHARTS_LOADING",
      payload:false
    });

} ,[dateValue.startDate, dateValue.endDate] )
  

  useEffect(() => {
    setDateValue(fetchedDateRange)
  },[fetchedDateRange])

  return (
    <div id = "date-range-main" >
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Start Date"
        value={+dateValue?.startDate || null}
        onChange={(newValue) => {
          handleChange(newValue,"start");
        }}
        minDate = {new Date(+fetchedDateRange.startDate)}
        maxDate = {new Date(+fetchedDateRange.endDate)}
        renderInput={(params) => <TextField {...params} size = "small" />}
        clearable = {true}
      />

    <DatePicker
        label="End Date"
        value={+dateValue?.endDate || null}
        disabled={endDisabled()}
        onChange={(newValue) => {
          handleChange(newValue,"end");
        }}
        minDate = {fetchMinDate()}
        maxDate = {new Date(+fetchedDateRange.endDate)}
        renderInput={(params) => <TextField {...params} size = "small"/>}
        clearable = {true}
      />
    </LocalizationProvider>

    <Button id = "view-button" variant = "outlined" size="medium" onClick={handleView} >View Dashboard</Button>

    <Tooltip title={
            <>
            <div>{"Select the date range to view the data within selected range"}</div>
            <div>{"Click on"} <b>{"View Dashboard"}</b> {"to view the charts"}</div>
          </>
          } placement="right-end"><div id = "info-icon"><InfoIcon /></div></Tooltip>
    </div>
  );
}