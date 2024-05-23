import {Component} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {WebSocketClientService} from "../ws.client.service";
import {Association} from "../../models/entities";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-associations-info',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, RouterLink
  ],
  templateUrl: './associations-info.component.html',
  styleUrl: './associations-info.component.scss'
})
export class AssociationsInfoComponent {
  association: Association | undefined;

  amount = new FormControl(0, [Validators.required])

  constructor(private router: Router, public ws: WebSocketClientService,
              public activatedRoute: ActivatedRoute) {
    const associationId = Number(this.activatedRoute.snapshot.params['id']);
    this.association = this.ws.GetAssociationsById(associationId);
  }

  createEvent(): void {
    // Assuming you have the ID available in your component
    const id = 'id'; // Replace 'your-id-value' with your actual ID

    // Navigate to the specified route with the ID parameter
    this.router.navigate(['app-event-page/:id'])
  }
}
