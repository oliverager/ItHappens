import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [
    RouterOutlet, RouterLink,RouterLinkActive,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {

}
