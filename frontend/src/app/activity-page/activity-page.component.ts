import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,
} from "@angular/forms";
import {WebSocketClientService} from "../ws.client.service";
import {CommonModule} from "@angular/common";
import {ClientWantsToCreateActivity} from "../../models/ClientWantsToCreateActivity";


@Component({
  selector: 'app-activity-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,CommonModule,
  ],
  templateUrl: './activity-page.component.html',
  styleUrl: './activity-page.component.scss'
})
export class ActivityPageComponent {
  ws = inject(WebSocketClientService)

  activityForm: FormGroup;
  isFormSubmitted: Boolean = false;
  constructor() {
    this.activityForm = new FormGroup({
      activityImage: new FormControl("", [Validators.required]),
      category: new FormControl("",[Validators.required]),
      location: new FormControl("",[Validators.required]),
      address: new FormControl("", [Validators.required]),
      association: new FormControl("",[Validators.required]),
      booking: new FormControl("",[Validators.required])
    })
  }
  onSubmit(){
    if (this.activityForm.valid) {
      this.createActivity();
      console.log("Success")
    } else {
      console.log("Failed to add user")
    }
}
  createActivity(){
    this.ws.socketConnection.sendDto(new ClientWantsToCreateActivity(this.activityForm.value!,))
  }
}
