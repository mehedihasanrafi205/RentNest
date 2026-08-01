"use server";

import { cookies } from "next/headers";
import { getMe } from "@/service/getme";
import type { PropertiesResponse, RentalsResponse } from "@/types";

export async function getLandlordProperties() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const user = await getMe();

  if (!accessToken || !user || user.role !== "LANDLORD") {
    return { success: false, data: [] };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/properties?landlordId=${user.id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      }
    );
    const result: PropertiesResponse = await res.json();
    return result.success ? result : { success: false, data: [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function getLandlordRequests() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, data: [] };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/bookings/landlord-requests`, 
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      }
    );
    const result: RentalsResponse = await res.json();
    return result.success ? result : { success: false, data: [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function createPropertyListing(formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  // Convert formData to JSON object based on IProperty payload
  const payload = {
    title: formData.get("title"),
    description: formData.get("description"),
    location: formData.get("location"),
    price: Number(formData.get("price")),
    amenities: (formData.get("amenities") as string)?.split(",").map(a => a.trim()).filter(Boolean) || [],
    images: formData.get("imageUrl") ? [formData.get("imageUrl") as string] : [],
  };

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/properties/create-listing`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}

export async function deletePropertyAction(propertyId: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/properties/${propertyId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}

export async function updateBookingStatus(id: string, status: "APPROVED" | "REJECTED") {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/bookings/${id}/update-status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}
