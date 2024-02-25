import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'
import { ColDef, GridApi } from 'ag-grid-community';
import { WebsocketService } from '../services/websocket.service';


@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.css'
})
export class PositionsComponent implements OnInit{

  constructor(private websocketService: WebsocketService) {

    

  }
  
  @ViewChild('positionsGrid') agGrid: AgGridAngular | undefined;
  rowData : any[] = [];
  colDefs : ColDef[] = [];
  count : number | undefined;
  webSocket: WebSocket | undefined;

 ngOnInit() {
      
  this.rowData = [
    { cusip: "Tesla", issuer: "Model Y", ticker: "aaa", quantity: 64950, positionId: 100 },
    { cusip: "Ford", issuer: "F-Series", ticker: "bbb",quantity: 33850, positionId : 101 },
    { cusip: "Toyota", issuer: "Corolla",ticker: "ccc",  quantity: 29600, positionId: 102 },
  ];

  // Column Definitions: Defines & controls grid columns.
  this.colDefs = [
    { field: "positionId" },
    { field: "cusip" },
    { field: "issuer" },
    { field: "ticker" },
    { field: "quantity" }
  ];

  }

  onGridReady(params: any) {
    console.log('grid ready');
    console.log(params.api.c);
  }

  
  

  async onPositionAdd() {
    this.genericPositionAdd({ cusip : "DAFFFG", issuer: "Toyota", ticker: "Corolla", quantity: 29600, positionId: 200 });
    this.genericPositionAdd({ cusip : "FFJYUH",issuer: "Tata", ticker: "sAFARI", quantity : 39600, positionId: 201 });
   // gridApi.updateRowData({ add: { make: "Tesla", model: "Model Y", price: 64950, electric: true }, addIndex: 3});
   // gridApi.applyTrasnsaction({add : [{}]});
  //gridApi.updateRowData({ add: { make: "Tesla", model: "Model Y", price: 64950, electric: true }});
  }

  onConnect() {
    if (this.webSocket == undefined) {
        this.webSocket = new WebSocket('ws://localhost:6979/position/ws?name=raman');

            this.webSocket.onopen = (event) => {
              this.webSocket?.send("cusips")
            };
            this.webSocket.onmessage = (event) => {
              let position = JSON.parse(event.data);
              this.genericPositionAdd(position)
            };
            this.webSocket.onerror = (event) => {
              console.error(event);
            };
    }
    else {
      this.webSocket?.send("cusips")
    }
  }


  genericPositionAdd(item : {cusip: string, issuer : string, ticker : string, quantity : number, positionId : number}) {
    this.agGrid?.api.applyTransaction(
          {
            add : [item  ]
          }
        );

      this.count = this.agGrid?.api.getDisplayedRowCount();
  }

}
