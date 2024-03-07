import { EmptyState } from "@/components";
import getUser from "@/actions/getUser";
import getFavoriteListings from "@/actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

export default async function Favorites() {
  const user = await getUser();
  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <div>
        <EmptyState title="No favorites found!" subtitle="Looks like you have no favorite listings" />
      </div>
    );
  }

  return <FavoritesClient listings={listings} user={user} />;
}
