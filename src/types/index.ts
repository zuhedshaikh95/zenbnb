import { Listing, Reservation } from "@prisma/client";

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

export interface SafeReservationI extends Reservation {
  listing: Listing;
}
