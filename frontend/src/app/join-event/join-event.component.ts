import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-join-event',
  standalone: true,
  imports: [],
  templateUrl: './join-event.component.html',
  styleUrl: './join-event.component.scss'
})
export class JoinEventComponent implements OnInit {
  //cardId: number;
  constructor(private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //this.cardId = +params['id'];

    });
  }
}
