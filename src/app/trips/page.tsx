import { EmptyState } from "@/components";
import getUser from "@/actions/getUser";
import { getReservations } from "@/actions";
import TripsClient from "../../components/TripsClient";

export default async function Trips() {
  const user = await getUser();
  const reservations = await getReservations({ userId: user?.id });

  if (!user) {
    return <EmptyState title="Unauthorized!" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    return <EmptyState title="No trips found!" subtitle="Looks like you haven't reserved any trips" />;
  }

  return (
    <div>
      <TripsClient reservations={reservations} user={user} />
    </div>
  );
}
