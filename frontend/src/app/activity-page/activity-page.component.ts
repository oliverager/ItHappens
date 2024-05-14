import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from "@angular/forms";
import {WebSocketClientService} from "../ws.client.service";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {ClientWantsToCreateActivity} from "../../models/ClientWantsToCreateActivity";


@Component({
  selector: 'app-activity-page',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule, NgOptimizedImage,
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

    } else {
      //this.toastService.error('Please fill in all required fields.');
    }
}
  createActivity(){
    this.ws.socketConnection.sendDto(new ClientWantsToCreateActivity(this.activityForm.value!,))
    //this.toastService.success('Activity created successfully');
  }
  ngOnInit(): void {
    // Add the event listener when the component initializes
    const inputField = document.getElementById('activityImage') as HTMLInputElement;
    const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;

    inputField.addEventListener('input', () => {
      imagePreview.src = inputField.value;
      imagePreview.style.display = 'block';
    });
}
}
