import { prisma } from "@/libs";

interface ParamsI {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings({
  userId,
  bathroomCount,
  category,
  endDate,
  guestCount,
  locationValue,
  roomCount,
  startDate,
}: ParamsI) {
  const query: { [key: string]: any } = {
    ...(userId && { userId }),
    ...(category && { category }),
    ...(roomCount && { roomCount: { gte: Number(roomCount) } }),
    ...(guestCount && { guestCount: { gte: Number(guestCount) } }),
    ...(bathroomCount && { bathroomCount: { gte: Number(bathroomCount) } }),
    ...(locationValue && { locationValue }),
  };

  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            {
              endDate: { gte: startDate },
              startDate: { lte: startDate },
            },
            {
              startDate: { lte: endDate },
              endDate: { gte: endDate },
            },
          ],
        },
      },
    };
  }

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
