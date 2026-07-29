import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { IApiResponse, IUser } from "@/types"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value

    if (!accessToken) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const response = await fetch(`${process.env.BACKEND_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const result: IApiResponse<IUser> = await response.json()

    if (!result.success) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    return NextResponse.json({ user: result.data })
  } catch {
    return NextResponse.json({ user: null }, { status: 500 })
  }
}
