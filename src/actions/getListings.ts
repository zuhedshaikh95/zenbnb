import { prisma } from "@/libs";

interface ParamsI {
  userId?: string;
}

export default async function getListings(params?: ParamsI) {
  const query = {
    ...(params?.userId && { userId: params.userId }),
  };

  try {
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
