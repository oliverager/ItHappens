import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {
  AbstractControl,
  FormControl, FormGroup, ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { TokenServiceService } from '../../../serviceAngular/token-service.service';
import {WebSocketClientService} from "../ws.client.service";
import {ClientWantsToSignup} from "../../models/ClientWantsToSignup";
import {ClientWantsToSignupOwner} from "../../models/ClientWantsToSignupOwner";
const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value: string = control.value;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);

  const isValid = hasUpperCase && hasLowerCase && hasNumber;

  return isValid ? null : { passwordRequirements: true };
}

@Component({
  selector: 'app-user-signup',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})

export class UserSignupComponent {

  ws = inject(WebSocketClientService);
  userForm: FormGroup;
  isFormSubmitted: Boolean = false;

  constructor(public router: Router, private tokenService: TokenServiceService) {
    this.userForm = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required,Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [Validators.required, Validators.pattern("[0-9]{8}")]),
      password: new FormControl("", [Validators.required, passwordValidator]),
      association_id: new FormControl ("", )
    });

    // Always initialize userOwnerForm with the association_id FormControl
  }

  onSubmit(){
    if (this.userForm.valid) {
      this.signUp();
      console.log("Success")
      this.router.navigate(["/user-login"]);
    } else {
      console.log("Failed to add user")
    }
  }

  onSubmitOwner(){
    if (this.userForm.valid) {
      this.signUpOwner();
      console.log("Success")
      this.router.navigate(["/user-login"]);
    } else {
      console.log("Failed to add user")
    }
  }

  getUserRole(): string | null {
    return this.tokenService.getUserRole();
  }

  signUp(){
    this.ws.socketConnection.sendDto(new ClientWantsToSignup(this.userForm.value!,))
  }

  signUpOwner() {

    this.ws.socketConnection.sendDto(new ClientWantsToSignupOwner(this.userForm.value!,));

  }

}



