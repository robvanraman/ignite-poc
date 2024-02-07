import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

   socket!: WebSocket;
   messageReceived: Subject<string> = new Subject<string>();

  constructor() {
     //this.socket = new WebSocket('wss://your-websocket-url');
    // this.socket.
   }

  connect(): void {

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      this.messageReceived.next(event.data);
    };

    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

closeConnection(): void {
    this.socket.close();
  }
}
