export class User {
  UserId?: number;
  Firstname?: string;
  Lastname?: string;
  Username?: string;
  Email?: string;
  Phone?: number;
  UserType?: number;
}

export class Association {
  AssociationId?: number;
  Name?: string;
  Email?: string;
  Phone?: number;
  Address?: string;
  Description?: string;
  BannerUrl?: string;
  ProfileUrl?: string;
}

export class Event {
  EventId?: number;
  Name?: string;
  Location?: string;
  ImageUrl?: string;
  Description?: string;
  Date?: Date;
  Amount?: number;
  Price?: number;
  AssociationId?: number;
  CategoryId?: number;
  BookingId?: number;
}
