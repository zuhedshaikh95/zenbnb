import getListingById from "@/actions/getListingById";
import { EmptyState } from "@/components";
import ListingClient from "../../../components/ListingClient";
import { getReservations } from "@/actions";

interface ParamsI {
  listingId?: string;
}

export default async function Listing({ params }: { params: ParamsI }) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} user={listing.user} reservations={reservations!} />;
}
