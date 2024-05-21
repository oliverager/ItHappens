import { Injectable } from '@angular/core';
import {Association, Event} from './models/entities'

@Injectable({
  providedIn: 'root'
})
export class State {
  events: Event[] = [
    {
      eventId: 1,
      name: "Annual Sports Meet",
      location: "1234 Sport Street",
      imageUrl: "assets/Football field.jpg",
      description: "A club offering various sports activities",
      date: new Date("2024-06-15"),
      amount: 100,
      price: 50,
      associationId: 2,
      categoryId: 3,
      bookingId: 4
    },
    {
      eventId: 2,
      name: "Music Concert",
      location: "5678 Music Avenue",
      imageUrl: "assets/Concert.jpg",
      description: "An evening of live music performances",
      date: new Date("2024-07-20"),
      amount: 200,
      price: 75,
      associationId: 5,
      categoryId: 6,
      bookingId: 7
    },
    {
      eventId: 3,
      name: "Tech Conference",
      location: "9101 Tech Road",
      imageUrl: "assets/Conference.jpg",
      description: "A conference showcasing the latest in technology",
      date: new Date("2024-08-25"),
      amount: 300,
      price: 100,
      associationId: 8,
      categoryId: 9,
      bookingId: 10
    },
    {
      eventId: 4,
      name: 'Roller Coaster Extravaganza at Six Flags!',
      location: 'Jackson, New Jersey',
      imageUrl: 'path_to_roller_coaster_image.jpg',
      description: 'Exciting roller coaster rides at Six Flags.',
      date: new Date('2024-06-08T15:00:00'),
      amount: 50,
      price: 20,
      associationId: 101,
      categoryId: 1,
      bookingId: 201,
    },
    {
      eventId: 5,
      name: 'Debate: Will AI Lead to Human Extinction?',
      location: 'New York',
      imageUrl: 'path_to_ai_debate_image.jpg',
      description: 'A thought-provoking debate on AI.',
      date: new Date('2024-05-23T01:00:00'),
      amount: 100,
      price: 10,
      associationId: 102,
      categoryId: 2,
      bookingId: 202,
    },
    {
      eventId: 6,
      name: 'Party Free Cover and 1 Free Drink Ticket Nightclub, Let\'s check this new Venue',
      location: 'New York',
      imageUrl: 'path_to_party_image.jpg',
      description: 'Join us for a fun night out!',
      date: new Date('2024-05-30T23:00:00'),
      amount: 80,
      price: 0,
      associationId: 103,
      categoryId: 3,
      bookingId: 203,
    },
    {
      eventId: 7,
      name: 'PMs in the PM',
      location: 'New York',
      imageUrl: 'path_to_pms_image.jpg',
      description: 'Happy Hour with fellow PMs.',
      date: new Date('2024-05-30T23:00:00'),
      amount: 80,
      price: 0,
      associationId: 104,
      categoryId: 4,
      bookingId: 204,
    }
  ];
  associations: Association[] = [
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
    }
  ];
}
