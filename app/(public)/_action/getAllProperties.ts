"use server";

import { cookies } from "next/headers";

// TypeScript Interfaces for Consistency
export interface ActionResult<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

// ? GET ALL PROPERTIES ACTION
export async function getAllPropertiesAction(
  query?: Record<string, string | number | boolean | undefined>
): Promise<ActionResult> {
  try {
    const params = new URLSearchParams();

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.append(key, String(value));
        }
      });
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/properties${queryString}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        next: {
          revalidate: 60,
          tags: ["properties"],
        },
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      let errorMessage = result?.message || "Failed to fetch properties.";

      if (
        Array.isArray(result?.errorSources) &&
        result.errorSources.length > 0
      ) {
        errorMessage = result.errorSources
          .map(
            (err: { path: string; message: string }) =>
              `${err.path}: ${err.message}`
          )
          .join(", ");
      }

      return {
        success: false,
        message: errorMessage,
      };
    }

    return {
      success: true,
      message: result?.message || "Properties fetched successfully!",
      data: result?.data,
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