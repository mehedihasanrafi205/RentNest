import { redirect } from "next/navigation";
import { getMe } from "@/service/getme";
import { ProfileContent } from "./_components/ProfileContent";


export default async function ProfilePage() {
  const user = await getMe();

  if (!user) {
    redirect("/login?redirectTo=/profile");
  }

  return <ProfileContent user={user} />;
}