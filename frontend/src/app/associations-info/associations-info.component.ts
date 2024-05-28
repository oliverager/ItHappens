import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {WebSocketClientService} from "../ws.client.service";
import {Association, Event} from "../../models/entities";
import {CommonModule} from "@angular/common";
import {TokenServiceService} from "../../../serviceAngular/token-service.service"

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
  ownerId: string | null;
  userRole: string | null;
  showAddEventButton: boolean = false;

  constructor(private router: Router, public ws: WebSocketClientService,
              public activatedRoute: ActivatedRoute, private tokenService: TokenServiceService) {
    const associationId = Number(this.activatedRoute.snapshot.params['id']);

    // Check if the association data is already in local storage
    // Get the stored association ID
    const storedAssociationId = localStorage.getItem('associationId');
    const storedAssociation = localStorage.getItem('association');
    const storedAssociationEvent = localStorage.getItem('associationEvent');

    if (storedAssociation && storedAssociationEvent && storedAssociationId === associationId.toString()) {
      // If the ID matches, use the stored data
      this.association = JSON.parse(storedAssociation);
      this.associationEvent = JSON.parse(storedAssociationEvent);
    } else {
      // Clear any old data in local storage
      localStorage.removeItem('associationId');
      localStorage.removeItem('association');
      localStorage.removeItem('associationEvent');

      // Fetch new data
      this.association = this.ws.GetAssociationsById(associationId);
      if (this.association) {
        localStorage.setItem('associationId', associationId.toString());
        localStorage.setItem('association', JSON.stringify(this.association));
        this.associationEvent = this.ws.getEventsByAssociationId(this.association.AssociationId!);
        localStorage.setItem('associationEvent', JSON.stringify(this.associationEvent));
      }
    }

    this.numberOfEvents = this.associationEvent.length;

    this.ownerId = tokenService.getAssociationId();
    this.userRole = tokenService.getUserRole();

    this.checkAddEventButtonVisibility();
  }

  checkAddEventButtonVisibility() {
    const associationId = Number(this.activatedRoute.snapshot.params['id']);
    if (this.userRole === '3' || this.ownerId === associationId.toString()) {
      this.showAddEventButton = true;
    }
  }
}
