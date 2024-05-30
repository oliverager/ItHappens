import { Component } from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {WebSocketClientService} from "../ws.client.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.scss'
})
export class DiscoverComponent {
  constructor(public ws: WebSocketClientService) {
  }

}
