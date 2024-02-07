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

  constructor(private websocketService: WebsocketService) {}
  
  @ViewChild('positionsGrid') agGrid: AgGridAngular | undefined;
  rowData : any[] = [];
  colDefs : ColDef[] = [];

 ngOnInit() {
      
  this.rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];

  // Column Definitions: Defines & controls grid columns.
  this.colDefs = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" }
  ];

  }

  onPositionAdd() {


   
    
    this.agGrid?.api.applyTransaction({add : [{ make: "Toyota", model: "Corolla", price: 29600, electric: false }, { make: "Toyota", model: "Corolla", price: 29600, electric: false }]});
   // gridApi.updateRowData({ add: { make: "Tesla", model: "Model Y", price: 64950, electric: true }, addIndex: 3});
   // gridApi.applyTrasnsaction({add : [{}]});
  //gridApi.updateRowData({ add: { make: "Tesla", model: "Model Y", price: 64950, electric: true }});
  }




  receivedMessages: string[] = [];
  initWebSocket() {
    this.websocketService.connect();
    this.websocketService.messageReceived.subscribe((message: string) => {
      this.receivedMessages.push(message);
    });
  }
  sendMessage(): void {
    const message = 'Hello, WebSocket!';
    this.websocketService.sendMessage(message);
  }
  closeWebSocket(): void {
    this.websocketService.closeConnection();
  }

}
