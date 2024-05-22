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
  associationId?: number;
  name?: string;
  email?: string;
  phone?: number;
  address?: string;
  description?: string;
  bannerUrl?: string;
  profileUrl?: string;
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
