import { NextResponse, NextRequest } from "next/server";
import getUser from "@/actions/getUser";
import { CustomException } from "@/utils";

interface IParams {
  listingId?: string;
}

export async function DELETE(request: NextRequest, { params }: { params: IParams }) {
  try {
    const user = await getUser();

    if (!user) {
      throw new CustomException(403, "Unauthorized!");
    }

    const { listingId } = params;

    if (!listingId) {
      throw new CustomException(400, "Bad request!");
    }

    await prisma?.listing.delete({
      where: {
        id: listingId,
        AND: [{ userId: user.id }],
      },
    });

    return NextResponse.json({
      message: `Property has been deleted!`,
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
