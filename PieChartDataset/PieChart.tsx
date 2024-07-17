import { useEffect, useRef,} from "react";
import * as React from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface ChartComponentProps {
  open: number;
  close: number;
  won: number;
  dataset : ComponentFramework.PropertyTypes.DataSet;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ open, close, won,dataset }) => {
    const [isloading,setLoading] = React.useState<boolean>(dataset.loading);
  const chartRef = useRef<HTMLCanvasElement>(null);
  let chartInstance: Chart<"pie", number[], string> | null = null;

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }
      chartInstance = new Chart(chartRef.current, {
        type: 'pie',
        data: {
          labels: ["Open", "Close", "Won"],
          datasets: [{
            data: [open, close, won],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };

    console.log("isloading",isloading);
  }, [isloading]);
if(isloading == true){
    return <p>Loading ...</p>;
}
else{
    return <canvas ref={chartRef}></canvas>;
}

};

export default ChartComponent;
