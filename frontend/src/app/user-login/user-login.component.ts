import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { WebSocketClientService } from '../ws.client.service';
import { ClientWantsToLogIn } from '../../models/ClientWantsToLogIn';
import {ToastrService} from "ngx-toastr";
import {delay} from "rxjs";

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  toaster=inject(ToastrService);
  ws = inject(WebSocketClientService);
  loginForm: FormGroup;
  isFormSubmitted: Boolean = true;
  constructor(public router: Router) {

    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }
  onSubmit(){
    if (this.loginForm.valid) {
      this.logIn();
      console.log("Success")
      this.toaster.success("You have been logged in", "Succes");
      this.router.navigate(['/home']);

    } else {
      console.log("Failed to login")
      this.toaster.error("Login Failed", "Error");

    }
  }

  logIn(){
    this.ws.socketConnection.sendDto(new ClientWantsToLogIn(this.loginForm.value!,))
  }
}


