import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebSocketClientService} from '../ws.client.service';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {RouterLink} from "@angular/router";
import {ClientWantsToGetEventFeed} from "../../models/ClientWantsToGetEventFeed";
import {ClientWantsToGetAssociationFeed} from "../../models/ClientWantsToGetAssociationFeed";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ToastModule, RouterLink], // Import necessary modules
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService] // Provide MessageService if necessary
})
export class HomeComponent implements OnInit {


  constructor(public ws: WebSocketClientService) {
  }

  ngOnInit(): void {
    this.GetEvents();
    this.GetAssociation()
  }

  GetEvents(): void {
    this.ws.socketConnection.sendDto(new ClientWantsToGetEventFeed());
  }

  GetAssociation(): void {
    this.ws.socketConnection.sendDto(new ClientWantsToGetAssociationFeed())
  }
}


