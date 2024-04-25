import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {
  AbstractControl,
  FormBuilder, ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
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
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule,
  ],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})



export class UserSignupComponent {
  ws: WebSocket = new WebSocket('ws://0.0.0.0:8181')


  createNewUser = this.fb.group({
    userName: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', Validators.required, passwordValidator]

  })

  constructor(public fb: FormBuilder) {
  }

}

