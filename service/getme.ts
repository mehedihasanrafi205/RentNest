"use server"


import type { IUser, IApiResponse } from "@/types"
import { cookies } from "next/headers"

export async function getMe(): Promise<IUser | null> {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) return null

    const response = await fetch(`${process.env.BACKEND_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) return null

    const result: IApiResponse<IUser> = await response.json()

    if (!result.success) return null

    return result.data
  } catch {
    return null
  }
}
