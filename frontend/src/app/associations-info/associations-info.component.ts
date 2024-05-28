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
  numberOfEvents: number = 0;

  constructor(private router: Router, public ws: WebSocketClientService,
              public activatedRoute: ActivatedRoute) {
    const associationId = Number(this.activatedRoute.snapshot.params['id']);

    // Check if the association data is already in local storage
    const storedAssociation = localStorage.getItem('association');
    const storedAssociationEvent = localStorage.getItem('associationEvent');

    if (storedAssociation) {
      this.association = JSON.parse(storedAssociation);
    } else {
      this.association = this.ws.GetAssociationsById(associationId);
      if (this.association) {
        localStorage.setItem('association', JSON.stringify(this.association));
      }
    }

    if (storedAssociationEvent) {
      this.associationEvent = JSON.parse(storedAssociationEvent);
    } else {
      if (this.association) {
        this.associationEvent = this.ws.getEventsByAssociationId(this.association.AssociationId!);
        localStorage.setItem('associationEvent', JSON.stringify(this.associationEvent));
      }
    }

    this.numberOfEvents = this.associationEvent.length;
  }
}
