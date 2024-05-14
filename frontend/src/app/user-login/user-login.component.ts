import {Component, inject} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { WebSocketClientService } from '../ws.client.service';
import { ClientWantsToLogIn } from '../../models/ClientWantsToLogIn';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink,RouterLinkActive,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {

  ws = inject(WebSocketClientService);
  loginForm: FormGroup;
  isFormSubmitted: Boolean = false;
  constructor() {

    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }
  onSubmit(){
    if (this.loginForm.valid) {
      this.logIn();
      console.log("Success")
    } else {
      console.log("Failed to login")
    }
  }

  logIn(){
    this.ws.socketConnection.sendDto(new ClientWantsToLogIn(this.loginForm.value!,))
  }
}


