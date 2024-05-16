import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from "@angular/forms";
import {WebSocketClientService} from "../ws.client.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ClientWantsToCreateEvent} from "../../models/ClientWantsToCreateEvent";


@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NgOptimizedImage,
  ],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss'
})
export class EventPageComponent {
  ws = inject(WebSocketClientService)

  eventForm: FormGroup;
  isFormSubmitted: Boolean = false;
  constructor() {
    this.eventForm = new FormGroup({
      eventImage: new FormControl("", [Validators.required]),
      category: new FormControl("",[Validators.required]),
      location: new FormControl("",[Validators.required]),
      address: new FormControl("", [Validators.required]),
      association: new FormControl("",[Validators.required]),
      booking: new FormControl("",[Validators.required])
    })
  }
  onSubmit(){
    if (this.eventForm.valid) {
      this.createEvent();

    } else {
      //this.toastService.error('Please fill in all required fields.');
    }
}
  createEvent(){
    this.ws.socketConnection.sendDto(new ClientWantsToCreateEvent(this.eventForm.value!,))
    //this.toastService.success('Activity created successfully');
  }

}
