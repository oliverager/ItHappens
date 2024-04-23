import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-signup',
  standalone: true,
    imports: [
        RouterOutlet,RouterLink,RouterLinkActive
    ],
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent {

}
