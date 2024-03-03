import { prisma } from "@/libs";

interface ParamsI {
  listingId?: string;
}

const getListingById = async (params: ParamsI) => {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    return listing;
  } catch (error: any) {
    return null;
  }
};

export default getListingById;
