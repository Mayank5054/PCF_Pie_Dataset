import { IInputs, IOutputs } from "./generated/ManifestTypes";
import {
    Chart,
    registerables
} from "chart.js";

import * as ReactDOM from "react-dom";
import * as React from "react";
import { PieChartNoneComponent } from "./PieNone";
import ChartComponent from "./PieChart";
 
Chart.register(...registerables);
export class PieChartDataset implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private open: number = 0;
    private close: number = 0;
    private won: number = 0;
    private _container: HTMLDivElement;
    private _chart: Chart<"pie", number[], string>;
 
    constructor() {
    }

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {

        // context.parameters.sampleDataSet.linking.addLinkedEntity({
        //     name:"opportunity",
        //     to:"parentcontactid",
        //     from:"opportunityid",
        //     linkType:"outer",
        //     alias:"RelatedOpportunities"
        // })
        // console.log(context.parameters.sampleDataSet.linking.getLinkedEntities());
        // console.log(context.parameters.sampleDataSet);
        this._container = document.createElement("div");
        container.appendChild(this._container);
        if(context.parameters.sampleDataSet.loading){
            this.displayLoader();
        }
    
    }


    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // console.log(context.parameters.sampleDataSet.records[0].getRecordId());
        this.getAndPrintData(context);

    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {};
    }

    private async getAndPrintData(context: ComponentFramework.Context<IInputs>) {

this.displayLoader();
const sto = setTimeout(()=>{
    const response = context.parameters.sampleDataSet.records;
    console.log("is loading",context.parameters.sampleDataSet.loading);
     for (const key in response) {
         const temp = response[key].getValue("statuscode");
         console.log(temp);
         if (temp == "1") {
             console.log("open");
             this.open++;
         }
         else if (temp == "2") {
             console.log("close");
             this.close++;
         }
         else {
             console.log("won");
             this.won++;
         }
     }

     if (this._chart) {
         this._chart.destroy();
     }

     if (this.open == 0 && this.close == 0 && this.won == 0) {
         ReactDOM.render(React.createElement(PieChartNoneComponent), this._container);
     }
     else {
    //  console.log(this.open,this.close,this.won);
    //      const canvas = document.createElement("canvas");
    //      this._container.innerHTML = "";
  
    //      this._chart = new Chart(canvas, {
    //          type: 'pie',
    //          data: {
    //              labels: ["Open", "Close", "Won"],
    //              datasets: [{
    //                  data: [this.open, this.close, this.won],
    //                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    //              }]
    //          },
    //          options: {
    //              responsive: true,
    //              maintainAspectRatio: false,
    //          }
    //      });
    //      this._container.appendChild(canvas);

          ReactDOM.render(React.createElement(ChartComponent,{
                open:this.open,
                close:this.close,
                won:this.won,
                dataset:context.parameters.sampleDataSet
            }),this._container);
        }
},3000);
    
       

            // ReactDOM.render(React.createElement(ChartComponent,{
            //     open:this.open,
            //     close:this.close,
            //     won:this.won,
            //     dataset:context.parameters.sampleDataSet
            // }),this._container);
        }
    
private async displayLoader(){
    ReactDOM.render(React.createElement(PieChartNoneComponent), this._container);
}

    public destroy(): void {
        if (this._chart) {
            this._chart.destroy();
        }
    }

}