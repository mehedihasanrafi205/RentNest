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
  const user = await getMe();

  if (!accessToken || !user || user.role !== "LANDLORD") {
    return { success: false, data: [] };
  }

  try {
    // We assume backend has a route or we fetch all rentals and filter. 
    // Here we just fetch all rentals for this landlord.
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/rentals/landlord/${user.id}`, 
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
