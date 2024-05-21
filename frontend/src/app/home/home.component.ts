import {ServerSendsEventFeed} from "../../models/ServerSendsEventFeed";
import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketClientService } from '../ws.client.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {State} from "../../state";
import {RouterLink} from "@angular/router";
import {ClientWantsToGetEventFeed} from "../../models/ClientWantsToGetEventFeed";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ToastModule, RouterLink], // Import necessary modules
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService] // Provide MessageService if necessary
})
export class HomeComponent implements OnInit{
  ws = inject(WebSocketClientService);

  constructor(public state: State) {}

  ngOnInit(): void {
    this.GetEvents();
  }

  GetEvents(): void {
    this.ws.socketConnection.sendDto(new ClientWantsToGetEventFeed());
  }
}


