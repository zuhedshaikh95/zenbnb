import { Listing, Reservation, User } from "@prisma/client";
import React from "react";

interface Props {
  data?: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  user?: User | null;
}

const ListingCard: React.FC<Props> = ({ actionId, actionLabel, data, onAction, reservation, user }) => {
  return <div>ListingCard</div>;
};

export default ListingCard;
