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
import {ServerGoodbyeMessage} from "../models/ServerGoodbyeMessage";
import {ServerSendsEventIds} from "../models/ServerSendsEventIds";

@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService {
  users: User[] = []; // Array to store user data
  events: Event[] = []; // Array to store event data
  associations: Association[] = []; // Array to store association data
  currentlyLoginUser: User = {}
  attendEvents: Event[] = [];

  public socketConnection: WebsocketSuperclass; // WebSocket connection instance

  constructor(public messageService: MessageService, public tokenService: TokenServiceService) {
    // Initialize the WebSocket connection with the server URL
    this.socketConnection = new WebsocketSuperclass(environment.websocketBaseUrl);
    // Handle events emitted by the server
    this.handleEventsEmittedByTheServer();
  }

  // Function to handle events emitted by the server
  handleEventsEmittedByTheServer() {
    this.socketConnection.onmessage = (event) => {
      const data = JSON.parse(event.data) as BaseDto<any>; // Parse incoming message data
      //console.log("Received: " + JSON.stringify(data));

      if (data.eventType === 'ClientWantsToLogIn') {
        const token = data.token; // Access the 'token' property
        if (token) { // Check if token is not undefined
          console.log("Received token: " + token);
          localStorage.setItem('jwt', token); // Store the token in local storage
          this.tokenService.setToken(token); // Set the token in the token service
        } else {
          console.log("Token is undefined"); // Handle the case where token is undefined
        }
      } else {
        console.log('Received event type: ${data.eventType}. No action taken.');
        //@ts-ignore
        this[data.eventType].call(this, data); // Call the appropriate method based on event type
      }
    }
  }

  // Filter events by AssociationId
  getEventsByAssociationId(associationId: number): Event[] {
    return this.events.filter(event => event.AssociationId === associationId);
  }

  // Get association by ID
  GetAssociationsById(associationId: number | undefined): Association {
    const associated = this.associations.find(associated => associated.AssociationId === associationId);
    if (!associated) {
      throw new Error('Association with id '+ associationId +' not found');
    }
    return associated;
  }

  // Get user by ID
  GetUsersById(userId: number) {
    // Simulating a timeout to mimic asynchronous behavior
    setTimeout(() => {
      const user = this.users.find(user => user.user_id === userId);
      if (!user) {
        throw new Error('User with id ' + userId + ' not found');
      }
      this.currentlyLoginUser = user;
      console.log(this.currentlyLoginUser)
    }, 1000); // You can adjust the timeout duration as needed
  }

  // Get event by ID
  GetEventsById(eventId: number): Event {
    const event = this.events.find(event => event.EventId === eventId);
    if (!event) {
      throw new Error('Event with id ' + eventId + ' not found');
    }
    return event;
  }

  // Handle the event where a new user is welcomed
  ServerWelcomesNewUser(data: any) {
    console.log(data)
    this.messageService.add({
      key: 'bottomcenter',
      life: 2000,
      severity: "info",
      summary: data,
    })
  }

  // Handle the event where the server sends an event feed
  ServerSendsEventFeed(dto: ServerSendsEventFeed) {
    this.events = dto.EventsFeedQueries!; // Update the events array with the new data
    console.log(this.events);
  }

  // Handle the event where the server sends an association feed
  ServerSendsAssociationFeed(dto: ServerSendsAssociationFeed) {
    this.associations = dto.AssociationFeedQueries!; // Update the associations array with the new data
    console.log(this.associations);
  }

  // Handle the event where the server sends a user feed
  ServerSendsUserFeed(dto: ServerSendsUserFeed) {
    this.users = dto.UserFeedQueries!; // Update the users array with the new data
    console.log(this.users);
  }

  // Handle the goodbye message from the server
  ServerGoodbyeMessage(dto: ServerGoodbyeMessage) {
    console.log(dto.message)
  }

  // Handle the event where the server sends event IDs
  ServerSendsEventIds(dto: ServerSendsEventIds) {
    const eventIds = dto.EventIdsQueries!;
    console.log(eventIds)
    const attendEvents: Event[] = [];
    for (let i = 0; i < eventIds.length; i++) {
      const event = this.GetEventsById(eventIds[i]);
      console.log(event)
      attendEvents.push(event);
    }
    this.attendEvents = attendEvents;

  }
}
