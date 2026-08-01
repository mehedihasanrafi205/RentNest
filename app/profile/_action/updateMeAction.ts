"use server";

import type { IApiResponse, IUser } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// Shared action return type
type ActionResult = { success: boolean; message: string };

// ? UPDATE ME ACTION
export async function updateMeAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Unauthorized. Please log in again." };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const image = formData.get("image") as string;

  if (!name || !email) {
    return {
      success: false,
      message: "Name and email are required.",
    };
  }

  // Build payload — only include fields that are provided
  const payload: Partial<Pick<IUser, "name" | "email" | "image">> = {
    name,
    email,
  };

  if (image) {
    payload.image = image;
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/users/update-me`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result: IApiResponse<IUser> = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message:
          result?.message ||
          "Failed to update profile. Please try again.",
      };
    }

    // Revalidate the cached profile data so the page reflects the update
    revalidateTag("my-profile", "default");

    return {
      success: true,
      message: result?.message || "Profile updated successfully!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
    };
  }
}
