import {Component, inject} from '@angular/core';
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
  users: User | undefined;
  usersEvent: Event | undefined;
  numberOfEvents: number = 0;

  constructor(private router: Router, public ws: WebSocketClientService,
              public activatedRoute: ActivatedRoute, public tokenService: TokenServiceService) {
    const userId = tokenService.getUserId();
    console.log(userId)
    this.users = this.ws.GetUsersById(userId);
    console.log(this.users)
  }

  DeleteUser() {
    this.ws.socketConnection.sendDto(new ClientWantsToDeleteUser(this.users));
  }
}
