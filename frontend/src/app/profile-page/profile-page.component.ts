import {Component} from '@angular/core';
import {WebSocketClientService} from "../ws.client.service";
import {Event} from "../../models/entities";
import {TokenServiceService} from "../../../serviceAngular/token-service.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ClientWantsToDeleteUser} from "../../models/ClientWantsToDeleteUser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  private readonly storage = window.sessionStorage;
  usersEvent: Event [] = [];
  numberOfEvents: number = 0;

  constructor(public ws: WebSocketClientService, public tokenService: TokenServiceService,
              public dialog: MatDialog, public route: Router) {
    const userId = tokenService.getUserId();
    this.ws.GetUsersById(userId);

    this.numberOfEvents = this.usersEvent.length;
  }

  DeleteUser() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the service to delete the user
        this.ws.socketConnection.sendDto(new ClientWantsToDeleteUser({userId: this.ws.user.user_id, }));
        this.storage.removeItem('token')
        this.route.navigate(["/home"])
      }
    });
  }
}
