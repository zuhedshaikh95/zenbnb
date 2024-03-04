import { prisma } from "@/libs";

interface ParamsI {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export const getReservations = async (params: ParamsI) => {
  const { authorId, listingId, userId } = params;

  const query = {
    ...(listingId && { listingId }),
    ...(userId && { userId }),
    ...(authorId && { listing: { userId: authorId } }),
  };

  try {
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error: any) {
    return [];
  }
};
