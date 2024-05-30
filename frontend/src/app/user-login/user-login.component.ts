import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { WebSocketClientService } from '../ws.client.service';
import { ClientWantsToLogIn } from '../../models/ClientWantsToLogIn';
import {MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import {TokenServiceService} from "../../../serviceAngular/token-service.service";

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, MessagesModule, ToastModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {

  ws = inject(WebSocketClientService);
  loginForm: FormGroup;
  isFormSubmitted: Boolean = true;
  constructor(public router: Router, private messageService: MessageService, private tokenService: TokenServiceService) {

    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }
  onSubmit(){
    if (this.loginForm.valid) {
      this.logIn();
      this.messageService.add({
        key: 'bottomcenter',
        life: 2000,
        severity: "Success",
        summary: "Success",
        detail: "You log in",
      });
      this.router.navigate(['/home']);
    } else {
      console.log("Failed to login")
    }
  }

  logIn(){
    this.ws.socketConnection.sendDto(new ClientWantsToLogIn(this.loginForm.value!,))
  }

  displayTokenValues() {
    const userId = this.tokenService.getUserId();
    const username = this.tokenService.getUsername();
    const userRole = this.tokenService.getUserRole();
    const associationId = this.tokenService.getAssociationId();

    alert(`UserID: ${userId}\nUsername: ${username}\nUserRole: ${userRole}\nAssociationID: ${associationId}`);
  }

}


