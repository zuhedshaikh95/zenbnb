import { NextRequest, NextResponse } from "next/server";
import getUser from "@/actions/getUser";
import { prisma } from "@/libs";
import { CustomException } from "@/utils";

interface ParamsI {
  listingId?: string;
}

export async function POST(request: NextRequest, { params }: { params: ParamsI }) {
  try {
    const user = await getUser();
    const { listingId } = params;

    if (!user) {
      throw new CustomException(401, "Please login to add to favorites!");
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      throw new CustomException(400, "Invalid id!");
    }

    user.favoriteIds.push(listingId!);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favoriteIds: user.favoriteIds,
      },
    });

    return NextResponse.json({
      message: `${listing.title} added to favorites!`,
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

export async function DELETE(request: NextRequest, { params }: { params: ParamsI }) {
  try {
    const user = await getUser();
    const { listingId } = params;

    if (!user) {
      throw new CustomException(401, "Please login to remove from favorites!");
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!listing) {
      throw new CustomException(400, "Invalid id!");
    }

    const favoriteIds = user.favoriteIds.filter((id) => id !== listingId);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        favoriteIds,
      },
    });

    if (!listing) {
      throw new CustomException(400, "Invalid id!");
    }

    return NextResponse.json({
      message: `${listing.title} removed from favorites!`,
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
