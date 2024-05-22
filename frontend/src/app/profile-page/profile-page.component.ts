import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
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

  loggedInUser: User | undefined;

  constructor(private ws: WebSocketClientService) {
    const userId = Number(localStorage.getItem("userId"));
    this.ws.getLoggedInUser(userId).subscribe(user => {
      this.loggedInUser = user;
    });
  }
}
