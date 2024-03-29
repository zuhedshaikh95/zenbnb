import getListings from "@/actions/getListings";
import getUser from "@/actions/getUser";
import { Container, EmptyState, ListingCard } from "@/components";
import { Listing } from "@prisma/client";
import { Suspense } from "react";

interface HomeProps {
  searchParams: {
    userId?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const user = await getUser();

  if (listings.length === 0) {
    return (
      <div>
        <EmptyState showReset />
      </div>
    );
  }

  return (
    <main>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: Listing) => (
            <ListingCard user={user} key={listing.id} data={listing} />
          ))}
        </div>
      </Container>
    </main>
  );
}
