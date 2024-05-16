import {Component, inject,} from '@angular/core';
import {CommonModule} from "@angular/common";
import {State} from "../../state";
import {ActivatedRoute, Router} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {WebSocketClientService} from "../ws.client.service";




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  wsService = inject(WebSocketClientService)
  constructor(public state: State, private router: Router) {
    const joinEventId = Number(this.route.snapshot.params['id']);

  }
  goToEvent(): void {
    // Assuming you have the ID available in your component
    const id = 'id'; // Replace 'your-id-value' with your actual ID

    // Navigate to the specified route with the ID parameter
    this.router.navigate(['join-event/id'])
  }
}
