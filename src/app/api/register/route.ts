"use server";
import { prisma } from "@/libs";
import { CustomException } from "@/utils";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name, password } = await request.json();

    if (!email || !name || !password) {
      throw new CustomException(400, "BAD REQUEST!, Invalid payload");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { data: user, message: "New user created!", success: true },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      return NextResponse.json({ message: "Email is already taken! Too late ☹️", success: false }, { status: 400 });
    }
    return NextResponse.json(
      { message: error.message, success: false },
      {
        status: error instanceof CustomException ? error.status : 500,
      }
    );
  }
}
