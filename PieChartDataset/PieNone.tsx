import * as React from "react";
import { Pie } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import * as Chart from "chart.js";
import "./loader.css";


export const PieChartNoneComponent: React.FC = () => {
    return (
        <>
      <div style={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div className="loader"></div>
      </div>


        </>
    )
};
