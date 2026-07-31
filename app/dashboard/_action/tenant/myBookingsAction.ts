"use server";

import { cookies } from "next/headers";

export async function getMyBookingsAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "You are not authenticated. Please login.",
        data: [],
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/bookings/my-bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to fetch bookings.",
        data: [],
      };
    }

    return {
      success: true,
      message: data?.message || "Bookings fetched successfully",
      data: data?.data || [],
    };
  } catch (error) {
    console.error("My Bookings Action Error:", error);
    return {
      success: false,
      message: "Something went wrong while fetching bookings.",
      data: [],
    };
  }
}