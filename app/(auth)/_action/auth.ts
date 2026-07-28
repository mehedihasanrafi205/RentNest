"use server"

import { cookies } from "next/headers"
import type { LoginResponse, RegisterResponse, UserRole } from "@/types"

// Shared action return type
type ActionResult = { success: boolean; message: string }

// ? LOGIN ACTION
export async function loginAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required.",
    }
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const result: LoginResponse = await response.json()

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result?.message || "Invalid credentials. Please try again.",
      }
    }

    const { accessToken, refreshToken } = result.data

    if (accessToken && refreshToken) {
      const cookieStore = await cookies()

      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      })

      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      })
    }

    return {
      success: true,
      message: result?.message || "Login successful!",
    }
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
    }
  }
}

// ? REGISTER ACTION
export async function registerAction(
  prevState: unknown,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as UserRole

  if (!name || !email || !password || !role) {
    return {
      success: false,
      message: "All fields are required.",
    }
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      }
    )

    const result: RegisterResponse = await response.json()

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result?.message || "Failed to register account.",
      }
    }

    return {
      success: true,
      message: result?.message || "Registration successful! Please login.",
    }
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later.",
    }
  }
}
