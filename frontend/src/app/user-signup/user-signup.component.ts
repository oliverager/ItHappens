import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

import {
  AbstractControl,
  FormControl, FormGroup, ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {CommonModule} from "@angular/common";
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
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule
  ],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})



export class UserSignupComponent {

userForm: FormGroup;
isFormSubmitted: Boolean = false;
  constructor() {
    this.userForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      userName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required,Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [Validators.required, Validators.pattern("[0-9]{8}")]),
      passWord: new FormControl("", [Validators.required, passwordValidator])
  })
  }
onSubmit(){
const isFormValid = this.userForm.valid
  debugger;
this.isFormSubmitted = true;
}

}



