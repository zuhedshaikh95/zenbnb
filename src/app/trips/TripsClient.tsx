"use client";
import { Container, Heading, ListingCard } from "@/components";
import { SafeReservationI } from "@/types";
import { User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  reservations: SafeReservationI[];
  user: User | null;
}

const TripsClient: React.FC<Props> = ({ reservations, user }) => {
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
      <Heading title="Trips" subtitle="Where you've been and where you're going" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            user={user}
            data={reservation.listing!}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
