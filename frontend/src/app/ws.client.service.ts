import {Injectable} from '@angular/core';
import {WebsocketSuperclass} from "../models/WebsocketSuperclass";
import {Association, Event, User} from "../models/entities";
import {environment} from "../environments/environment";
import {MessageService} from "primeng/api";
import {ServerSendsEventFeed} from "../models/ServerSendsEventFeed";
import {ServerSendsAssociationFeed} from "../models/ServerSendsAssociationFeed";
import {ServerSendsUserFeed} from '../models/ServerSendsUserFeed';
import {TokenServiceService} from "../../serviceAngular/token-service.service";
import {BaseDto} from "../models/baseDto";


@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService {
  users: User[] = [];
  events: Event[] = [];
  associations: Association[] = [];

  public socketConnection: WebsocketSuperclass;

  constructor(public messageService: MessageService, public tokenService: TokenServiceService) {
    this.socketConnection = new WebsocketSuperclass(environment.websocketBaseUrl);
    this.handleEventsEmittedByTheServer()
  }

  handleEventsEmittedByTheServer() {
    this.socketConnection.onmessage = (event) => {
      const data = JSON.parse(event.data) as BaseDto<any>;
      console.log("Received: " + JSON.stringify(data));

      if (data.eventType === 'ClientWantsToLogIn') {
        const token = data.token; // Access the 'token' property
        if (token) { // Check if token is not undefined
          console.log("Received token: " + token);
          localStorage.setItem('jwt', token);
          this.tokenService.setToken(token);
        } else {
          console.log("Token is undefined"); // Handle the case where token is undefined
        }
      } else {
        console.log('Received event type: ${data.eventType}. No action taken.');
        //@ts-ignore
        this[data.eventType].call(this, data);
      }
    }
  }

  // Filter events by AssociationId
  getEventsByAssociationId(associationId: number): Event[] {
    return this.events.filter(event => event.AssociationId === associationId);
  }

  GetAssociationsById(associationId: number | undefined): Association | undefined {
    return this.associations.find(associated => associated.AssociationId === associationId);
  }

  GetUsersById(userId: number | undefined): User | undefined {
    return this.users.find(user => user.userId === userId);
  }

  GetEventsById(eventId: number): Event | undefined {
    return this.events.find(event => event.EventId === eventId);
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
    this.associations = dto.AssociationFeedQueries!;
    console.log(this.associations);
  }

  ServerSendsUserFeed(dto: ServerSendsUserFeed) {
    this.users = dto.UserFeedQueries!;
    console.log(this.users);
  }
}


