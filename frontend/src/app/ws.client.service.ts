import {Injectable} from '@angular/core';
import {BaseDto} from "../models/baseDto";
import {WebsocketSuperclass} from "../models/WebsocketSuperclass";
import {Association, Event, User} from "../models/entities";
import {environment} from "../environments/environment";
import {MessageService} from "primeng/api";
import {ServerSendsEventFeed} from "../models/ServerSendsEventFeed";
import {ServerSendsAssociationFeed} from "../models/ServerSendsAssociationFeed";
import { ServerSendsUserFeed } from '../models/ServerSendsUserFeed';
import {Observable, of} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService {
  users: User[] = [];
  events: Event[] = [];
  associations: Association[] = [

    {
      AssociationId: 3,
      Name: "Community Garden",
      Email: "garden@community.org",
      Phone: 23456789,
      Address: "91011 Green Road",
      Description: "Community managed garden for residents",
      BannerUrl: "assets/Football field.jpg",
      ProfileUrl: "assets/Football field.jpg"
    }
  ];

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
    return this.associations.find(associated => associated.AssociationId === associationId);
  }

GetUsersById(userId: number): User | undefined {
  return this.users.find(user => user.userId === userId);
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
    this.events = dto.EventsFeedQueries!;
    console.log(this.events);
  }

  ServerSendsAssociationFeed(dto: ServerSendsAssociationFeed) {
    this.associations = dto.AssociationsFeedQueries!;
    console.log(this.associations);
  }
  ServerSendsUserFeed(dto: ServerSendsUserFeed) {
    this.users = dto.UsersFeedQueries!;
    console.log(this.users);
  }
}


