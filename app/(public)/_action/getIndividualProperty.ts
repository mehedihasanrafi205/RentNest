"use server";

export async function getIndividualPropertyAction(id: string) {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/properties/${id}`,
      {
        cache: "no-store", 
      }
    );

    if (!res.ok) {
      return { success: false, message: "Failed to fetch property details" };
    }

    const data = await res.json();
    return { success: true, data: data.data || data };
  } catch (error) {
    console.error("Error fetching property:", error);
    return { success: false, message: "Something went wrong" };
  }
}