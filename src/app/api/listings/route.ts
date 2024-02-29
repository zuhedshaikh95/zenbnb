import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import prisma from "@/libs/prismadb";
import getUser from "@/actions/getUser";
import { CustomException } from "@/utils";

const listingsCreateSchema = z.object({
  Category: z.string(),
  Location: z.string(),
  Guest_Count: z.number(),
  Bathroom_Count: z.number(),
  Room_Count: z.number(),
  Image: z.string(),
  Price: z.string(),
  Title: z.string(),
  Description: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();

    if (!user) {
      throw new CustomException(403, "Unauthorized!");
    }

    const json = await request.json();
    const body = listingsCreateSchema.parse(json);

    const { Bathroom_Count, Category, Description, Guest_Count, Image, Location, Price, Room_Count, Title } = body;

    const listing = await prisma.listing.create({
      data: {
        title: Title,
        description: Description,
        imageSrc: Image,
        category: Category,
        roomCount: Room_Count,
        bathroomCount: Bathroom_Count,
        guestCount: Guest_Count,
        price: parseInt(Price, 10),
        locationValue: Location,
        userId: user.id,
      },
    });

    return NextResponse.json({ message: "New listing created!", success: true, data: listing }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: `${error.issues[0].path
            .toString()
            .split("_")
            .join(" ")} step is missing, \n fill those for quick listing`,
          success: false,
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { message: error.message, success: false },
      {
        status: error instanceof CustomException ? error.status : 500,
      }
    );
  }
}
