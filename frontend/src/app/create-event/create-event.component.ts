import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from "@angular/forms";
import {WebSocketClientService} from "../ws.client.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ClientWantsToCreateEvent} from "../../models/ClientWantsToCreateEvent";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NgOptimizedImage,
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
  ws = inject(WebSocketClientService)

  eventForm: FormGroup;
  isFormSubmitted: Boolean = false;
  constructor(private activatedRoute: ActivatedRoute) {
    const associationId = Number(this.activatedRoute.snapshot.params['id']);

    this.eventForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      location: new FormControl("",Validators.required),
      imageUrl: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      date: new FormControl(Date,Validators.required),
      price: new FormControl(Number),
      association: new FormControl(associationId),
      category: new FormControl(Number),


    })
  }
  onSubmit(){
    if (this.eventForm.valid) {
      this.createEvent();

    } else {
      console.log("error")
    }
}
  createEvent(){
    this.ws.socketConnection.sendDto(new ClientWantsToCreateEvent(this.eventForm.value!,))
    //this.toastService.success('Activity created successfully');
  }

}
