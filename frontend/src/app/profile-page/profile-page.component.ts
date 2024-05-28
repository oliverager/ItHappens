import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {WebSocketClientService} from "../ws.client.service";
import {Event, User} from "../../models/entities";
import {TokenServiceService} from "../../../serviceAngular/token-service.service";
import {ClientWantsToDeleteUser} from "../../models/ClientWantsToDeleteUser";

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
  usersEvent: Event [] = [];
  numberOfEvents: number = 0;

  constructor(public ws: WebSocketClientService, public tokenService: TokenServiceService) {
    const userId = tokenService.getUserId();
    this.user = this.ws.GetUsersById(userId);
  }

  DeleteUser() {
    this.ws.socketConnection.sendDto(new ClientWantsToDeleteUser());
  }
}
