import { Injectable } from '@angular/core';
import {BaseDto} from "../models/baseDto";
import {WebsocketSuperclass} from "../models/WebsocketSuperclass";
import {Association} from "../models/entities";
import {State} from "../state";
import { environment } from "../environments/environment";
import {MessageService} from "primeng/api";
import {Subject} from "rxjs";
import {ServerSendsEventFeed} from "../models/ServerSendsEventFeed";


@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService  {

  public eventItems: any[] = [];

  public socketConnection: WebsocketSuperclass;

  constructor(public state: State, public messageService: MessageService) {
    this.socketConnection = new WebsocketSuperclass(environment.websocketBaseUrl);
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
    return this.state.associations.find(associated => associated.id === associationId);
  }

  ServerWelcomesNewUser(data: any) {
    console.log(data)
    this.messageService.add({
      key: 'bottomcenter',
      life: 2000,
      severity: "info",
      summary: data,
    })
  }

  ServerSendsEventFeed(data: ServerSendsEventFeed) {
    this.eventItems = data.EventsFeedQueries!;
    console.log(this.eventItems);

  }
}
