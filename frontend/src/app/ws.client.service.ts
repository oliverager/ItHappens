import { Injectable } from '@angular/core';
import {BaseDto} from "../models/baseDto";
import {WebsocketSuperclass} from "../models/WebsocketSuperclass";

@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService  {

  public socketConnection: WebsocketSuperclass;

  constructor() {
    this.socketConnection = new WebsocketSuperclass("ws://localhost:8181");
    this.handleEventsEmittedByTheServer()
  }

  handleEventsEmittedByTheServer() {
    this.socketConnection.onmessage = (event) => {
      const data = JSON.parse(event.data) as BaseDto<any>;
      console.log("Received: " + JSON.stringify(data));
      //@ts-ignore
      this[data.eventType].call(this, data);
    }
  }
}
