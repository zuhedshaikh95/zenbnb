import { NextResponse, NextRequest } from "next/server";
import getUser from "@/actions/getUser";
import { CustomException } from "@/utils";

interface IParams {
  reservationId?: string;
}

export async function DELETE(request: NextRequest, { params }: { params: IParams }) {
  try {
    const user = await getUser();

    if (!user) {
      throw new CustomException(403, "Unauthorized!");
    }

    const { reservationId } = params;

    if (!reservationId) {
      throw new CustomException(400, "Bad request!");
    }

    await prisma?.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [{ userId: user.id }, { listing: { userId: user.id } }],
      },
    });

    return NextResponse.json({
      message: `Reservation has been cancelled successfully!`,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false },
      {
        status: error instanceof CustomException ? error.status : 500,
      }
    );
  }
}
