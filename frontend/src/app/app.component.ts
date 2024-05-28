import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ClientWantsToGetEventFeed} from "../models/ClientWantsToGetEventFeed";
import {ClientWantsToGetAssociationFeed} from "../models/ClientWantsToGetAssociationFeed";
import {WebSocketClientService} from "./ws.client.service";
import {ClientWantsToGetUserFeed} from "../models/ClientWantsToGetUserFeed";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, RouterLink, RouterLinkActive, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  ws = inject(WebSocketClientService)

  ngOnInit(): void {
    this.GetEvents();
    this.GetAssociation();
    this.GetUser();
  }

  GetEvents(): void {
    this.ws.socketConnection.sendDto(new ClientWantsToGetEventFeed());
  }

  GetAssociation(): void {
    this.ws.socketConnection.sendDto(new ClientWantsToGetAssociationFeed())
  }
  GetUser(): void {
    this.ws.socketConnection.sendDto(new ClientWantsToGetUserFeed())
  }
}
