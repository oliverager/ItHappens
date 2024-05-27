import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {WebSocketClientService} from "../ws.client.service";
import {Association, Event} from "../../models/entities";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-create-associations-info',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, RouterLink
  ],
  templateUrl: './associations-info.component.html',
  styleUrl: './associations-info.component.scss'
})
export class AssociationsInfoComponent {
  association: Association | undefined;
  associationEvent: Event[] = [];
  numberOfEvents: number;

  constructor(private router: Router, public ws: WebSocketClientService,
              public activatedRoute: ActivatedRoute) {
    const associationId = Number(this.activatedRoute.snapshot.params['id']);
    this.association = this.ws.GetAssociationsById(associationId);

    if (this.association) {
      this.associationEvent = this.ws.getEventsByAssociationId(this.association.AssociationId!);
    }

    this.numberOfEvents = this.associationEvent.length;
  }

  createEvent(): void {
    const id = 'id'; // Replace 'id' with the actual ID
    this.router.navigate(['app-event-page', id]);
  }
}
