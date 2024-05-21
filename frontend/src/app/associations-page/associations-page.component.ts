import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {WebSocketClientService} from "../ws.client.service";
import {Association} from "../../models/entities";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-associations-page',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './associations-page.component.html',
  styleUrl: './associations-page.component.scss'
})
export class AssociationsPageComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  association: Association | undefined;

  amount = new FormControl(0, [Validators.required])

  constructor( private router: Router,public ws : WebSocketClientService) {
    const associationId = Number(this.route.snapshot.params['id']);
    this.association = this.ws.GetAssociationsById(associationId);
  }
  createEvent(): void {
    // Assuming you have the ID available in your component
    const id = 'id'; // Replace 'your-id-value' with your actual ID

    // Navigate to the specified route with the ID parameter
    this.router.navigate(['app-event-page/:id'])
  }
}
