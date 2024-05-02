import { Injectable } from '@angular/core';
import {BaseDto} from "../models/baseDto";
import {WebsocketSuperclass} from "../models/WebsocketSuperclass";
import {Association} from "../models/entities";
import {State} from "../state";

@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService  {

  public socketConnection: WebsocketSuperclass;

  constructor(public state: State) {
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

  GetAssociationsById(associationId: number): Association | undefined {
    return this.state.associateds.find(associated => associated.id === associationId);
  }
}
