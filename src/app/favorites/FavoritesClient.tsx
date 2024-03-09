"use client";
import { Container, Heading, ListingCard } from "@/components";
import { Listing, User } from "@prisma/client";
import React from "react";

interface Props {
  listings: Listing[];
  user: User | null;
}

const FavoritesClient: React.FC<Props> = ({ listings, user }) => {
  return (
    <Container>
      <Heading title="Favorites!" subtitle="List of places you have favorited" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} user={user} data={listing} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
