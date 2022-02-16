import React,{ useEffect, useState } from "react";

export const Chart = ({data,plotId}) => {

    let layout = {
        title : {
            text : `${plotId} Chart`,
            font : {
                color : "#1f77b4",
                size : 18,
                family : "Arial"
            }
        },
        yaxis : {
            ticklabelstep : 2,
            title : {
                text : "Appsite ID",
                font : {
                    color : "#1f77b4",
                    size : 16,
                    family : "Arial"
                }
            },
            standoff: 10,
            ticklabeloverflow:"allow",
            tickfont: {
                size:9
            }
        },
        xaxis : {
             title : {
                text : "Impressions Offered",
                font : {
                    color : "#1f77b4",
                    size : 16,
                    family :"Arial"
                }
            },
        },
        margin : {
            l : plotId === "Bar" ? 180 : 80
        },
        // showlegend :false
    }

    useEffect(() => {
        window.Plotly.newPlot(plotId, data,layout);
      }, [data]);

    return (
    <div
        id={plotId}
        className={plotId}
        style={{ height: "100%", width: "100%" }}>
    </div>
    )
}
