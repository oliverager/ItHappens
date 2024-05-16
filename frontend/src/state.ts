import { Injectable } from '@angular/core';
import {Association, Card, Booking} from './models/entities'

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
      title: "Eventstarstruck",
      location: "field2",
      imgurl: "assets/badminton.jpg"
    },
    {
      id: 2,
      bookinid: 2,
      title: "Eventstarstruck",
      address: "popvej3",
      location: "field3",
      category: "badminton",
      description: "Her er der beskrivelse af eventen",
      imgurl: "assets/badminton.jpg"
    },
    {
      id: 3,
      bookinid: 3,
      title: "Eventstarstruck",
      address: "popvej4",
      location: "field4",
      category: "badminton",
      description: "Her er der beskrivelse af eventen",
      imgurl: "assets/badminton.jpg"
    },
    {
      id: 4,
      bookinid: 4,
      title: "Eventstarstruck",
      address: "popvej5",
      location: "field5",
      category: "badminton",
      description: "Her er der beskrivelse af eventen",
      imgurl: "assets/badminton.jpg"
    },
    {
      id: 5,
      bookinid: 5,
      title: "Eventstarstruck",
      address: "popvej6",
      location: "field6",
      category: "badminton",
      description: "Her er der beskrivelse af eventen",
      imgurl: "assets/Football field.jpg"
    },
    {
      id: 6,
      bookinid: 6,
      title: "Eventstarstruck",
      address: "popvej7",
      location: "field7",
      category: "badminton",
      description: "Her er der beskrivelse af eventen",
      imgurl: "assets/Football field.jpg"
    },
    {
      id: 7,
      bookinid: 7,
      title: "Eventstarstruck",
      address: "popvej8",
      location: "field8",
      category: "badminton",
      description: "Her er der beskrivelse af eventen",
      imgurl: "assets/Football field.jpg"
    },
    {
      id: 8,
      bookinid: 8,
      title: "Eventstarstruck",
      address: "popvej9",
      location: "field9",
      category: "badminton",
      description: "Her er der beskrivelse af eventen",
      imgurl: "assets/Football field.jpg"
    },
    {
      id: 9,
      bookinid: 9,
      title: "Eventstarstruck",
      address: "popvej10",
      location: "field10",
      category: "badminton",
      description: "Her er der beskrivelse af eventen",
      imgurl: "assets/Football field.jpg"
    },
    {
      id: 10,
      bookinid: 10,
      title: "Eventstarstruck",
      address: "popvej11",
      location: "field11",
      category: "badminton",
      description: "Her er der beskrivelse af eventen",
      imgurl: "assets/Football field.jpg"
    },
  ];
  bookings: Booking[] = [
    {
      id: 1,
      bookings_id: 1,
      association_id: 1,
      location: "lane 2",
      activity_id: 1,
      imgurl: "assets/football-field.png"

    },
    {
      id: 2,
      bookings_id: 2,
      association_id: 2,
      location: "lane 3",
      activity_id: 2,
      imgurl: "assets/football-field.png"
    },
    {
      id: 3,
      bookings_id: 3,
      association_id: 3,
      location: "lane 4",
      activity_id: 3,
      imgurl: "assets/football-field.png"
    },
    {
      id: 4,
      bookings_id: 4,
      association_id: 4,
      location: "lane 5",
      activity_id: 4,
      imgurl: "assets/football-field.png"
    },
    {
      id: 5,
      bookings_id: 5,
      association_id: 5,
      location: "lane 6",
      activity_id: 5,
      imgurl: "assets/football-field.png"
    },
    {
      id: 6,
      bookings_id: 6,
      association_id: 6,
      location: "lane 2",
      activity_id: 6,
      imgurl: "assets/football-field.png"
    },
    {
      id: 7,
      bookings_id: 7,
      association_id: 7,
      location: "lane 7",
      activity_id: 7,
      imgurl: "assets/football-field.png"
    },
    {
      id: 8,
      bookings_id: 8,
      association_id: 8,
      location: "lane 8",
      activity_id: 8,
      imgurl: "assets/football-field.png"
    },
    {
      id: 9,
      bookings_id: 9,
      association_id: 9,
      location: "lane 9",
      activity_id: 9,
      imgurl: "assets/football-field.png"
    },
    {
      id: 10,
      bookings_id: 10,
      association_id: 10,
      location: "lane 10",
      activity_id: 10,
      imgurl: "assets/football-field.png"
    }

  ];

}
