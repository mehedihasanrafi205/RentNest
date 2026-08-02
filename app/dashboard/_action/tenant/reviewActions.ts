"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// 1. Submit / Update a Review
export async function submitReviewAction(
  propertyId: string,
  rating: number,
  comment: string
) {
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

    if (res.ok) {
      revalidatePath(`/properties/${propertyId}`);
      revalidatePath("/dashboard/tenant/reviews");
    }

    return result;
  } catch (error) {
    console.error("Submit review error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

// 2. Get User's Own Reviews (GET /reviews/my-reviews or similar endpoint)
export async function getTenantReviewsAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return { success: false, data: [] };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/reviews/my-reviews`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });

    const result = await res.json();
    return result.success ? result : { success: false, data: [] };
  } catch (error) {
    console.error("Get tenant reviews error:", error);
    return { success: false, data: [] };
  }
}

// 3. Get Reviews by Property ID
export async function getReviewsByPropertyId(propertyId: string) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/reviews/${propertyId}`,
      { cache: "no-store" }
    );

    const result = await res.json();
    return result.success ? result : { success: false, data: [] };
  } catch (error) {
    console.error("Get reviews error:", error);
    return { success: false, data: [] };
  }
}