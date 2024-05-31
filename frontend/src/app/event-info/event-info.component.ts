import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {WebSocketClientService} from "../ws.client.service";
import {Association, Event} from "../../models/entities";
import {DatePipe} from "@angular/common";
import {TokenServiceService} from "../../../serviceAngular/token-service.service";
import {ClientWantsToAttendEvent} from "../../models/ClientWantsToAttendEvent";


@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.scss'
})
export class EventInfoComponent implements OnInit{
  events: Event | undefined;
  association: Association | undefined;

  constructor(private router: Router, public ws: WebSocketClientService,
              public activatedRoute: ActivatedRoute, public tokenService: TokenServiceService) {

    const eventId = Number(activatedRoute.snapshot.params['id']);

    // Get the stored event ID
    const storedEventId = localStorage.getItem('eventId');
    const storedEvent = localStorage.getItem('events');
    const storedAssociation = localStorage.getItem('association');

    if (storedEvent && storedEventId === eventId.toString()) {
      // If the ID matches, use the stored data
      this.events = JSON.parse(storedEvent);
    } else {
      // Clear any old data in local storage
      localStorage.removeItem('eventId');
      localStorage.removeItem('events');
      localStorage.removeItem('association');

      // Fetch new data
      this.events = this.ws.GetEventsById(eventId);
      if (this.events) {
        localStorage.setItem('eventId', eventId.toString());
        localStorage.setItem('events', JSON.stringify(this.events));
      }
    }

    if (storedAssociation && storedEventId === eventId.toString()) {
      // If the ID matches, use the stored data
      this.association = JSON.parse(storedAssociation);
    } else {
      const associationId = this.events?.AssociationId;
      if (associationId) {
        this.association = this.ws.GetAssociationsById(associationId);
        localStorage.setItem('association', JSON.stringify(this.association));
      }
    }
  }

  ngOnInit() {
    this.disableAttendButtonIfNecessary();
  }

  attendEvent() {
    const userId = this.tokenService.getUserId();
    const eventId = Number(this.activatedRoute.snapshot.params['id']);
    const dto = new ClientWantsToAttendEvent({ userId, eventId });
    this.ws.socketConnection.send(JSON.stringify(dto));
    this.router.navigate(["/home"]);
  }

  disableAttendButtonIfNecessary() {
    const attendEvents: Event[] = this.ws.attendEvents;
    const currentEventId = this.events?.EventId;

    if (attendEvents && currentEventId) {
      const isAttended = attendEvents.some(event => event.EventId === currentEventId);
      if (isAttended) {
        const attendButton = document.querySelector('.attend-btn') as HTMLButtonElement;
        if (attendButton) {
          attendButton.disabled = true
          attendButton.classList.add('disabled-button'); // Add disabled class for styling
          console.log('disabled')
        } else {
          console.log('not disabled')
        }
      }
    }
  }
}

