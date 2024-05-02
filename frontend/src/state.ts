import { Injectable } from '@angular/core';
import {Association, Card} from './models/entities'

@Injectable({
  providedIn: 'root'
})
export class State {
  associateds: Association[] = [
    {
      id: 1,
      name: "Sports Club",
      email: "info@sportsclub.com",
      telephone: 12345678,
      address: "1234 Sport Street",
      description: "A club offering various sports activities",
      imgUrl: "assets/Football field.jpg"
    },
    {
      id: 2,
      name: "Art Center",
      email: "contact@artcenter.com",
      telephone: 98765432,
      address: "5678 Art Ave",
      description: "Center for local artists to display their work",
      imgUrl: "assets/Football field.jpg"
    },
    {
      id: 3,
      name: "Community Garden",
      email: "garden@community.org",
      telephone: 23456789,
      address: "91011 Green Road",
      description: "Community managed garden for residents",
      imgUrl: "assets/badminton.jpg"
    },
    {
      id: 4,
      name: "Tech Hub",
      email: "info@techhub.com",
      telephone: 34567890,
      address: "1213 Innovation Blvd",
      description: "Tech hub providing workshops and seminars",
      imgUrl: "assets/badminton.jpg"
    }
  ]
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


