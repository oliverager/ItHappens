import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { WebSocketClientService } from '../ws.client.service';
import { ClientWantsToLogIn } from '../../models/ClientWantsToLogIn';
import {MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";

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
  constructor(public router: Router, private messageService: MessageService) {

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
      //this.router.navigate(['/home']);
    } else {
      console.log("Failed to login")
    }
  }

  logIn(){
    this.ws.socketConnection.sendDto(new ClientWantsToLogIn(this.loginForm.value!,))
  }
}


