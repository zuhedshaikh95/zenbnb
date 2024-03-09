"use client";
import React from "react";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Heading, Container, ListingCard } from "@/components";
import { SafeReservationI, User } from "@/types";

interface Props {
  reservations: SafeReservationI[];
  user: User | null;
}

const ReservationsClient: React.FC<Props> = ({ reservations, user }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        const response = await axios.delete(`/api/reservations/${id}`);

        toast.success(response.data.message);
        router.refresh();
      } catch (error: any) {
        if (error instanceof AxiosError && error.response?.data) {
          toast.error(error.response?.data.message);
          return;
        }
        toast.error(error.message);
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            user={user}
            reservation={reservation}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
