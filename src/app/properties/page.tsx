import { EmptyState } from "@/components";
import getUser from "@/actions/getUser";
import getListings from "@/actions/getListings";
import PropertiesClient from "../../components/PropertiesClient";

export default async function Properties() {
  const user = await getUser();
  const listings = await getListings({ userId: user?.id });

  if (!user) {
    return <EmptyState title="Unauthorized!" subtitle="Please login" />;
  }

  if (listings.length === 0) {
    return <EmptyState title="No properties found!" subtitle="Looks like you haven't listed any properties" />;
  }

  return <PropertiesClient listings={listings} user={user} />;
}
