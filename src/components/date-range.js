import React,{useEffect,useState,useCallback} from "react";
import {Button,TextField} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useDashboardValue } from "../utils/reducer";
import {getAllCharts} from "../utils/api-service";

export const DateRange = () => {
const [{fetchedDateRange},dispatch] = useDashboardValue();
  const [dateValue, setDateValue] = useState(fetchedDateRange);
  console.log('dateValue: ', dateValue);
  const endDisabled = () => !dateValue?.startDate;
  const handleChange = (newValue,type) => {
    console.log('newvalue',newValue,"type",type);
    let selectedDate = new Date(newValue);
    let epochTime = selectedDate.getTime();
    console.log('typeof',typeof epochTime)
    if(type === "start") {
        // setDateValue({
        //     startDate : epochTime,
        //     endDate : null
        // })
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
} ,[dateValue.startDate, dateValue.endDate] )
  

  useEffect(() => {
    setDateValue(fetchedDateRange)
  },[fetchedDateRange])

  return (
    <div style = {{display:"flex",flexShrink : 1,gap:"1rem",margin:"1.5rem"}}>
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

    <Button variant = "outlined" style ={{alignSelf:"flex-end",width:"10rem"}} size="medium" onClick={handleView} >View Dashboard</Button>
    </div>
  );
}
    
    DateRange.defaultProps = {
      allowKeyboardControl: false,
      disabled: false,
      error: false, //new Date(02-06-2019) Minimum date to display
      format: "dd/MM/yyyy", // MM(month),dd(date),yyyy(year)
      size: "small",
    };