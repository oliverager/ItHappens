export class Card {
  id? : number;
  bookinid? : number;
  address? : string;
  location? : string;
  activities? : string;
  imgurl? : string;
}
export class Association {
  id? : number;
  name? : string;
  email? : string;
  telephone? : number;
  address? : string;
  description? : string;
  imgUrl? : string;
}
export class Booking {
  id? : number;
  bookings_id? : number;
  association_id?: number;
  location?: string;
  activity_id?: number;
  imgurl? : string;
}
export class Event {
  eventId?: number;
  name?: string;
  location?: string;
  imageUrl?: string;
  description?: string;
  date?: Date;
  amount?: number;
  price?: number;
  associationId?: number;
  categoryId?: number;
  bookingId?: number;
}
