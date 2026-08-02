"use server";

import { cookies } from "next/headers";
import { getMe } from "@/service/getme";
import type { UsersResponse, PropertiesResponse } from "@/types";
import { revalidatePath } from "next/cache";

export async function getAdminStats() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const user = await getMe();

  if (!accessToken || !user || user.role !== "ADMIN") {
    return { success: false, data: null };
  }

  try {
    const [usersRes, propertiesRes] = await Promise.all([
      getAllUsers(),
      getAllProperties(),
    ]);

    const users = usersRes.data || [];
    const properties = propertiesRes.data || [];

    const totalUsers = users.length;
    const totalProperties = properties.length;

    const totalRentals = 0;
    const pendingRentals = 0;
    const totalRevenue = 0;

    return {
      success: true,
      data: {
        totalUsers,
        totalProperties,
        totalRentals,
        pendingRentals,
        totalRevenue,
      },
    };
  } catch (error) {
    console.error("Error calculating admin stats:", error);
    return { success: false, data: null };
  }
}

export async function getAllUsers() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, data: [] };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/users`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    const result: UsersResponse = await res.json();
    return result.success ? result : { success: false, data: [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function toggleUserBanStatus(userId: string, isBanned: boolean) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/users/${userId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBanned }),
      }
    );

    const result = await res.json();

    if (res.ok) {
      revalidatePath("/dashboard/admin/users");
      revalidatePath("/dashboard/admin");
    }

    return result;
  } catch (error) {
    console.error("Toggle ban status error:", error);
    return { success: false, message: "Something went wrong" };
  }
}

export async function getAllProperties() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, data: [] };
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/properties?limit=100`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    });
    const result: PropertiesResponse = await res.json();
    return result.success ? result : { success: false, data: [] };
  } catch (error) {
    return { success: false, data: [] };
  }
}

export async function deletePropertyAdmin(propertyId: string) {
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