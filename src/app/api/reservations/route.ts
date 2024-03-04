import { NextRequest, NextResponse } from "next/server";
import { CustomException } from "@/utils";
import getUser from "@/actions/getUser";
import { prisma } from "@/libs";

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      throw new CustomException(403, "Unauthorized!");
    }

    const { listingId, startDate, endDate, totalPrice } = await request.json();

    const listingAndReservation = await prisma.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: user.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Listing Reserved!",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      {
        status: error instanceof CustomException ? error.status : 500,
      }
    );
  }
}
