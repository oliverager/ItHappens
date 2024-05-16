import { Injectable } from '@angular/core';
import {BaseDto} from "../models/baseDto";
import {WebsocketSuperclass} from "../models/WebsocketSuperclass";
import {Association} from "../models/entities";
import {State} from "../state";
import {environment} from "../environments/environment";
import {ServerBroadcastsEventFeed} from "../models/ServerBroadcastsEventFeed";

@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService  {

  public socketConnection: WebsocketSuperclass;

  constructor(public state: State) {
    this.socketConnection = new WebsocketSuperclass(environment.websocketBaseUrl
    );
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

  ServerWelcomesUser(data: any) {
    console.log(data)
  }

  ServerBroadcastsEventFeed(dto: ServerBroadcastsEventFeed) {

  }
}
