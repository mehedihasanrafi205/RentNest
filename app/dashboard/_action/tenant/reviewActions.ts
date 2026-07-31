"use server";

import { cookies } from "next/headers";
import { getMe } from "@/service/getme";

export async function submitReviewAction(propertyId: string, rating: number, comment: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/reviews`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ propertyId, rating, comment }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
