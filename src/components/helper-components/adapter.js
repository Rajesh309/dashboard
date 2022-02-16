
export const Adapter = (payload) => {
    switch(payload.type) {
        case "Bar" : {
            let x = payload.actualData.map(eachData => eachData.appSiteId);
            let y = payload.actualData.map(eachData => eachData.impressions_offered);
            let traceData = [{
                x : y,
                y : x,
                type: "bar",
                orientation: "h",
            }]

            return traceData
        }

        case "Pie" : {
            let labels = payload.actualData.map(eachData => eachData.advertiserId),
                values = payload.actualData.map(eachData => eachData.CM001);

            let traceData = [{
                type: "pie",
                values: values,
                labels: labels,
                textinfo: "label+percent",
                insidetextorientation: "radial",
                textposition:"none"
            }]

        return traceData
        }

        case "Table" : {
            let {actualData = []} = payload || {};
            let obj = actualData?.[0] || {};
            let headerValues = Object.keys(obj).map(eachKey => [`<b>${eachKey}</b>`]);
            let firstColumn = [], secondColumn = [];

            actualData.forEach(eachData => {
                let values = Object.values(eachData);
                firstColumn.push(values[0]);
                secondColumn.push(values[1]);
            })
            let cellValues = [firstColumn,secondColumn];
            
           let traceData = [{
            type: 'table',
            header: {
              values: headerValues,
              align: "center",
              height:40,
              line: {width: 1, color: '#506784'},
              fill: {color: '#1f77b4'},
              font: {family: "Arial", size: 16, color: "white"}
            },
            cells: {
              values: cellValues,
              align: "center",
              height:30,
              line: {color: "#506784", width: 1},
              fill: {color: ['#CAF0F8', 'white']},
              font: {family: "Arial", size: 14, color: ["#506784"]}
            }
          }] 

          return traceData
        }

        
    }
    
}