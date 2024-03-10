import { EmptyState } from "@/components";
import getUser from "@/actions/getUser";
import { getReservations } from "@/actions";
import ReservationsClient from "../../components/ReservationsClient";

export default async function Reservations() {
  const user = await getUser();

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login!" />;
  }

  const reservations = await getReservations({
    authorId: user?.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState title="No reservations found!" subtitle="Looks like you have no reservations on your property" />
    );
  }

  return <ReservationsClient reservations={reservations} user={user} />;
}
