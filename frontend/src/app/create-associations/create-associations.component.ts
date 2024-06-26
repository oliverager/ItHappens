import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {WebSocketClientService} from "../ws.client.service";
import {ClientWantsToCreateAssociations} from "../../models/ClientWantsToCreateAssociations";

@Component({
  selector: 'app-create-associations',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './create-associations.component.html',
  styleUrl: './create-associations.component.scss'
})
export class CreateAssociationsComponent {
  associationForm: FormGroup;
  isFormSubmitted: Boolean = false;

  constructor(public ws: WebSocketClientService) {
    this.associationForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(4)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl(Number, [Validators.required, Validators.pattern("[0-9]{8}")]),
      address: new FormControl("", [Validators.required, Validators.pattern
      ("^(?=\\S*\\s)(?=[^a-zA-Z]*[a-zA-Z])(?=\\D*\\d)[a-zA-Z\\d\\s',.#/-]*$")]),
      description: new FormControl("", [Validators.required, Validators.minLength(4)]),
      bannerUrl: new FormControl("", [Validators.required, Validators.minLength(4)]),
      profileUrl: new FormControl("", [Validators.required, Validators.minLength(4)]),
    })
  }

  onSubmit() {
    if (this.associationForm.valid) {
      this.createAssociation();
      console.log("Success")
    } else {
      console.log("Failed to create Association")
    }
  }

  createAssociation() {
    this.ws.socketConnection.sendDto(new ClientWantsToCreateAssociations(this.associationForm.value!,))
  }
}
