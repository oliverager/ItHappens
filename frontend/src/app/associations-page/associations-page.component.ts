import {Component, inject} from '@angular/core';
import {State} from "../../state";
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
  wsService = inject(WebSocketClientService)
  association: Association | undefined;

  amount = new FormControl(0, [Validators.required])

  constructor( public state: State, private router: Router) {
    const associationId = Number(this.route.snapshot.params['id']);
    this.association = this.wsService.GetAssociationsById(associationId);
  }
  createEvent(): void {
    // Assuming you have the ID available in your component
    const id = 'id'; // Replace 'your-id-value' with your actual ID

    // Navigate to the specified route with the ID parameter
    this.router.navigate(['app-event-page/:id'])
  }
}
