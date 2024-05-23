import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebSocketClientService} from '../ws.client.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ToastModule, RouterLink], // Import necessary modules
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService] // Provide MessageService if necessary
})
export class HomeComponent {

  constructor(public ws: WebSocketClientService) {
  }
}


