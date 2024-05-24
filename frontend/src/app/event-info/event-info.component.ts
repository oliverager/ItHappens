import {Component} from '@angular/core';
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
export class EventInfoComponent {
  events: Event | undefined;
  association: Association | undefined;



  constructor(private router: Router, public ws: WebSocketClientService,
              public activatedRoute: ActivatedRoute, public tokenService: TokenServiceService) {

    const eventId = Number(activatedRoute.snapshot.params['id']);
    this.events = this.ws.GetEventsById(eventId);

    const associationId = this.events?.AssociationId;
    this.association = this.ws.GetAssociationsById(associationId);


  }

  attendEvent() {

    const userId = this.tokenService.getUserId();

    const eventId = Number(this.activatedRoute.snapshot.params['id']);

    const dto = new ClientWantsToAttendEvent({ userId, eventId });

    this.ws.socketConnection.send(JSON.stringify(dto));


  }

}
