import getListingById from "@/actions/getListingById";
import { Container, EmptyState, ListingHead, ListingInfo } from "@/components";
import { categories } from "@/configs/categories.config";

interface ParamsI {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: ParamsI }) {
  const listing = await getListingById(params);
  const category = categories.find((category) => category.label === listing?.category);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing?.title}
            imageSrc={listing?.imageSrc}
            locationValue={listing?.locationValue}
            id={listing?.id}
            user={listing?.user}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing?.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
