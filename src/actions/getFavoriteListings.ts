import { prisma } from "@/libs";
import getUser from "./getUser";

export default async function getFavoriteListings() {
  try {
    const user = await getUser();

    if (!user) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...user.favoriteIds],
        },
      },
    });

    return favorites;
  } catch (error: any) {
    console.error("getFavoriteListings error: ", error.message);
    return [];
  }
}
