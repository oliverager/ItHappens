import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {WebSocketClientService} from "../ws.client.service";
import {User} from "../../models/entities";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterLink,
    ReactiveFormsModule,
    CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  user: User | undefined;

  constructor(private ws: WebSocketClientService) {
    const userId = Number(['Id']);
    this.user = this.ws.GetUsersById(userId);
  }
}
