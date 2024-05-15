import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {WebSocketClientService} from "../ws.client.service";
import {ClientWantsToCreateAssociations} from "../../models/ClientWantsToCreateAssociations";

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
  ws = inject(WebSocketClientService);
  associationForm: FormGroup;
  isFormSubmitted: Boolean = false;
  constructor() {
    this.associationForm = new FormGroup({
      name: new FormControl("", [Validators.required,Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl(0, [Validators.required, Validators.pattern("[0-9]{8}")]),
      address: new FormControl("", [Validators.required, Validators.pattern
      ("^(?=\\S*\\s)(?=[^a-zA-Z]*[a-zA-Z])(?=\\D*\\d)[a-zA-Z\\d\\s',.#/-]*$")]),
      description: new FormControl("", [Validators.required, Validators.minLength(4)]),
      bannerUrl: new FormControl("", [Validators.required, Validators.minLength(4)]),
      profileUrl: new FormControl("", [Validators.required, Validators.minLength(4)]),
    })
  }
  onSubmit(){
    if (this.associationForm.valid) {
      this.createAssociation();
      console.log("Success")
    } else {
      console.log("Failed to create Association")
    }
  }

  createAssociation(){
    this.ws.socketConnection.sendDto(new ClientWantsToCreateAssociations(this.associationForm.value!,))
  }
}
