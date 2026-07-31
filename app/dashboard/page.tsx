import { redirect } from "next/navigation";
import { getMe } from "@/service/getme";

export default async function DashboardPage() {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "ADMIN") redirect("/dashboard/admin");
  if (user.role === "LANDLORD") redirect("/dashboard/landlord");
  redirect("/dashboard/tenant");
}