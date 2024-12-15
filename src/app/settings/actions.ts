"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UpdateProfileValues, updateProfileSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export async function updateProfile(values: UpdateProfileValues) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { name } = updateProfileSchema.parse(values);

  // Update currently authenticated user's name
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
    },
  });

  // this will refresh the app (clears the cache) so that the updated name is displayed correctly in all places (ex: navbar etc)
  revalidatePath("/");
}
