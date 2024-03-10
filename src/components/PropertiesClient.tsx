"use client";
import { Container, Heading, ListingCard } from "@/components";
import { Listing, User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  listings: Listing[];
  user: User | null;
}

const TripsClient: React.FC<Props> = ({ listings, user }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        const response = await axios.delete(`/api/listings/${id}`);
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
      <Heading title="Properties" subtitle="List of your properties" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            user={user}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete porperty"
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
