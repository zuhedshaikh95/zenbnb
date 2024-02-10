"use server";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/libs";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error: any) {
    return null;
  }
}