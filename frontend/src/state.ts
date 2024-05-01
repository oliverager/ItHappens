import { Injectable } from '@angular/core';
import { Card } from './entities'

@Injectable({
  providedIn: 'root'
})
export class State {
  cards: Card[] = [
    {
      id: 1,
      bookinid: 1,
      address: "popvej2",
      location: "field2",
      activities: "badminton",
      imgurl: "assets/badminton.jpg"
    },
    {
      id: 2,
      bookinid: 2,
      address: "popvej3",
      location: "field3",
      activities: "badminton",
      imgurl: "assets/badminton.jpg"
    },
    {
      id: 3,
      bookinid: 3,
      address: "popvej4",
      location: "field4",
      activities: "badminton",
      imgurl: "assets/badminton.jpg"
    },
    {
      id: 4,
      bookinid: 4,
      address: "popvej5",
      location: "field5",
      activities: "badminton",
      imgurl: "assets/badminton.jpg"
    },
    {
      id: 5,
      bookinid: 5,
      address: "popvej6",
      location: "field6",
      activities: "badminton",
      imgurl: "assets/Football field.jpg"
    },
    {
      id: 6,
      bookinid: 6,
      address: "popvej7",
      location: "field7",
      activities: "badminton",
      imgurl: "assets/Football field.jpg"
    },
    {
      id: 7,
      bookinid: 7,
      address: "popvej8",
      location: "field8",
      activities: "badminton",
      imgurl: "assets/Football field.jpg"
    },
    {
      id: 8,
      bookinid: 8,
      address: "popvej9",
      location: "field9",
      activities: "badminton",
      imgurl: "assets/Football field.jpg"
    },
    {
      id: 9,
      bookinid: 9,
      address: "popvej10",
      location: "field10",
      activities: "badminton",
      imgurl: "assets/Football field.jpg"
    },
    {
      id: 10,
      bookinid: 10,
      address: "popvej11",
      location: "field11",
      activities: "badminton",
      imgurl: "assets/Football field.jpg"
    },
  ];
}


