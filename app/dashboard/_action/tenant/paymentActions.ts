"use server";

import { cookies } from "next/headers";

// ১. Checkout Session তৈরির action
export async function createCheckoutSessionAction(bookingId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Authentication required." };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API || process.env.BACKEND_API_URL}/payments/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId }),
        cache: "no-store",
      }
    );

    const data = await res.json();

    if (!res.ok || !data?.data?.url) {
      return {
        success: false,
        message: data?.message || "Failed to create checkout session.",
      };
    }

    return {
      success: true,
      url: data.data.url,
    };
  } catch (error) {
    console.error("Checkout Action Error:", error);
    return { success: false, message: "Something went wrong with payment." };
  }
}

// ২. Payment History পাওয়ার action
export async function getMyPaymentsAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, message: "Authentication required.", data: [] };
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API || process.env.BACKEND_API_URL}/payments/my-payments`,
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
        message: data?.message || "Failed to fetch payment history.",
        data: [],
      };
    }

    return {
      success: true,
      data: data?.data || [],
    };
  } catch (error) {
    console.error("My Payments Action Error:", error);
    return { success: false, message: "Failed to load payments.", data: [] };
  }
}