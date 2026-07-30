"use server"

import { cookies } from "next/headers"

export async function createBookingAction(propertyId: string) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return {
        success: false,
        message: "You are not logged in. Please login to book this property.",
      }
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/bookings/book-property`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ propertyId }),
        cache: "no-store",
      }
    )

    const data = await res.json()

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "You are not logged in. Please login first.",
      }
    }

    return {
      success: true,
      message: data?.message || "Property booked successfully!",
      data,
    }
  } catch (error) {
    console.error("Booking Action Error:", error)
    return {
      success: false,
      message: "Something went wrong while placing the booking.",
    }
  }
}
