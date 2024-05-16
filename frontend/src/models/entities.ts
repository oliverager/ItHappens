export class Card {
  title? : string;
  id? : number;
  bookinid? : number;
  address? : string;
  location? : string;
  category? : string;
  description? : string;
  associationsid? : string;
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
