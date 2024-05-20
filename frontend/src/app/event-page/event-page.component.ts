import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from "@angular/forms";
import {WebSocketClientService} from "../ws.client.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ClientWantsToCreateEvent} from "../../models/ClientWantsToCreateEvent";
import {ToastrService} from "ngx-toastr";


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
  toaster=inject(ToastrService);
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
      this.toaster.success("You created an event", "Succes");
    } else {
      this.toaster.error("Failed to create an event", "Error");
    }
}
  createEvent(){
    this.ws.socketConnection.sendDto(new ClientWantsToCreateEvent(this.eventForm.value!,))
  }

}
