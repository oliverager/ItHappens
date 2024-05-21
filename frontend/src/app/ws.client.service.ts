import {Injectable} from '@angular/core';
import {BaseDto} from "../models/baseDto";
import {WebsocketSuperclass} from "../models/WebsocketSuperclass";
import {Association, Event} from "../models/entities";
import {environment} from "../environments/environment";
import {MessageService} from "primeng/api";
import {ServerSendsEventFeed} from "../models/ServerSendsEventFeed";
import {ServerSendsAssociationFeed} from "../models/ServerSendsAssociationFeed";


@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService  {

  events: Event[] = [];
  associations: Association[] = [];

  public socketConnection: WebsocketSuperclass;

  constructor(public messageService: MessageService) {
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
    return this.associations.find(associated => associated.id === associationId);
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

  ServerSendsEventFeed(dto: ServerSendsEventFeed) {
    this.events = dto.EventsFeedQueries!
    console.log(this.events);
  }

  ServerSendsAssociationFeed(dto: ServerSendsAssociationFeed) {
    this.associations = dto.AssociationsFeedQueries!
    console.log(this.associations);
  }
}

