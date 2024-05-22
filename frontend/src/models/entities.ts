export class User {
  userId?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  phone?: number;
  userType?: number;
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
