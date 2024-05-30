import {Component, inject, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ClientWantsToGetEventFeed} from "../models/ClientWantsToGetEventFeed";
import {ClientWantsToGetAssociationFeed} from "../models/ClientWantsToGetAssociationFeed";
import {WebSocketClientService} from "./ws.client.service";
import {ClientWantsToGetUserFeed} from "../models/ClientWantsToGetUserFeed";
import {TokenServiceService} from "../../serviceAngular/token-service.service";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, RouterLink, RouterLinkActive, ToastModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly storage = window.sessionStorage;
  title = 'frontend';

  constructor(public ws: WebSocketClientService, public ts: TokenServiceService) {
  }

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

  get isLogin(): boolean {
    let username = this.ts.getUsername();
    return username != null;
  }

  SignOut() {
    this.storage.removeItem('token')
  }
}
