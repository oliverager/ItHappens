import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-associations',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './associations.component.html',
  styleUrl: './associations.component.scss'
})
export class AssociationsComponent {
  associationForm: FormGroup;
  isFormSubmitted: Boolean = false;
  constructor() {
    this.associationForm = new FormGroup({
      associationName: new FormControl("", [Validators.required,Validators.minLength(4)]),
      associationAddress: new FormControl("", [Validators.required, Validators.pattern
      ("^(?=\\S*\\s)(?=[^a-zA-Z]*[a-zA-Z])(?=\\D*\\d)[a-zA-Z\\d\\s',.#/-]*$")]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [Validators.required, Validators.pattern("[0-9]{8}")]),

    })
  }
  onSubmit(){
    const isFormValid = this.associationForm.valid
    debugger;
    this.isFormSubmitted = true;
  }
}
