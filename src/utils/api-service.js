const axios = require("axios");


export const signIn = async(payload) => {
    try{
        let response = await axios.post('https://sigviewauth.sigmoid.io/signIn',payload);
        console.log('response',response) ;
        return response.data 
    }
    catch(e){
        console.log('error',e);
        return false
    }
    
}

export const getRange = async(payload) => {
    try{
        let response = await axios.post('https://sigviewauth.sigmoid.io/api/v1/getDateRange',payload,{
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token")
            }
          });
        console.log('response',response) ;
        return response.data
    }
    catch(e){
        console.log('error',e);
        return false
    }
    
}

export const getBar = (date) => {
    let payload = {
        "_id": "dashboard1516252235693",
        "emailId": "candidate@sigmoid.com",
        "orgViewReq": {
          "organization": "DemoTest",
          "view": "Auction"
        },
        "chartObject": {
          "metadata": {
            "title": "chartobject:1516252235693",
            "img_thumbnail": "../img/chart.png",
            "chartType": "bar",
            "dataLimit": 50
          },
          "requestParam": {
            "granularity": "hour",
            "timeZone": {
              "name": "UTC (+00:00)",
              "location": "UTC"
            },
            "dateRange": {
              "startDate": date.startDate,
              "endDate": date.endDate
            },
            "xAxis": [
              "D017"
            ],
            "yAxis": [
              "M002"
            ],
            "approxCountDistinct": [],
            "specialCalculation": [],
            "filter": [],
            "orderBy": {
              "metricOrdByList": [
                {
                  "id": "M002",
                  "desc": true
                }
              ]
            },
            "percentCalList": []
          }
        }
      };

    try{
        let response = axios.post('https://sigviewauth.sigmoid.io/api/v1/getData',payload,{
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token")
            }
          });
        return response
    }
    catch(e){
        console.log('error',e);
        return false
    }
}

export const getPie = (date) => {
    let payload = {
        "_id": "Datastory_ChartId_1535224664111",
        "emailId": "candidate@sigmoid.com",
        "orgViewReq": {
          "organization": "DemoTest",
          "view": "Auction"
        },
        "chartObject": {
          "metadata": {
            "title": "",
            "img_thumbnail": "images/pie.png",
            "chartType": "pie",
            "dataLimit": 500
          },
          "text": [],
          "requestParam": {
            "granularity": "hour",
            "timeZone": {
              "name": "UTC (+00:00)",
              "location": "UTC"
            },
            "dateRange": {
              "startDate": date.startDate,
              "endDate": date.endDate
            },
            "xAxis": [
              "D005"
            ],
            "yAxis": [],
            "approxCountDistinct": [],
            "specialCalculation": [
              "CM001"
            ],
            "filter": [],
            "orderBy": {
              "customMetricOrdByList": [
                {
                  "id": "CM001",
                  "desc": true
                }
              ]
            },
            "percentCalList": [
              {
                "id": "CM001"
              }
            ]
          }
        }
      };

    try{
        let response = axios.post('https://sigview.sigmoid.io/api/v1/getData',payload,{
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token")
            }
          });
        return response 
    }
    catch(e){
        console.log('error',e);
        return false
    }
}

export const getTable = (date) => {
    let payload = {
        "_id": "dashboard1516252439345",
        "emailId": "candidate@sigmoid.com",
        "orgViewReq": {
          "organization": "DemoTest",
          "view": "Auction"
        },
        "chartObject": {
          "metadata": {
            "title": "chartobject:1516252439345",
            "img_thumbnail": "../img/chart.png",
            "chartType": "table",
            "dataLimit": 50
          },
          "requestParam": {
            "granularity": "hour",
            "timeZone": {
              "name": "UTC (+00:00)",
              "location": "UTC"
            },
            "dateRange": {
              "startDate": date.startDate,
              "endDate": date.endDate
            },
            "xAxis": [
              "D044"
            ],
            "yAxis": [
              "M002"
            ],
            "approxCountDistinct": [],
            "specialCalculation": [],
            "filter": [],
            "orderBy": {
              "metricOrdByList": [
                {
                  "id": "M002",
                  "desc": true
                }
              ]
            },
            "percentCalList": []
          }
        }
      };

    try{
        let response = axios.post('https://sigviewauth.sigmoid.io/api/v1/getData',payload,{
            headers: {
              "x-auth-token": localStorage.getItem("x-auth-token")
            }
          });
        return response 
    }
    catch(e){
        console.log('error',e);
        return false
    }
}

export const getAllCharts = async(date) => {
    console.log('date in all',date)
    let promises = [getTable(date),getBar(date),getPie(date)];
    let result = await axios.all(promises);
    console.log('result of charts',result);

    let data = result.map(eachResult => eachResult?.data?.result?.data || []);
    return data

}
