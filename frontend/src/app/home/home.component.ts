import { Component } from '@angular/core';
import {State} from "../../state";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
constructor(public state: State) {

}


}
