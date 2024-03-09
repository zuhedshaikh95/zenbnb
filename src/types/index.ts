export enum RentModalStepsE {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export interface CountryI {
  flag: string;
  label: string;
  latlng: [number, number];
  region: string;
  value: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string;
  price: number;
}

export interface Reservation {
  id: string;
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  createdAt: Date;
  updatedAt: Date;
  favoriteIds: string[];
}

export interface SafeReservationI extends Reservation {
  listing: Listing;
}

export enum SearchModalStepsE {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}
