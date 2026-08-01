"use client";

import { useEffect, useState, useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Shield,
  Calendar,
  LayoutDashboard,
  ArrowLeft,
  Save,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import type { IUser } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { updateMeAction } from "../_action/updateMeAction";

interface ProfileContentProps {
  user: IUser;
}

export function ProfileContent({ user }: ProfileContentProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateMeAction, null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const userDashboardHref = `/dashboard/${user.role?.toLowerCase() || "user"}`;

  const roleBadgeStyles: Record<string, string> = {
    ADMIN: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    LANDLORD: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    TENANT: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  };

  // Handle form submission result
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Profile updated successfully!");
      // Refresh the page to show updated data
      router.refresh();
    } else {
      toast.error(state.message || "Failed to update profile.");
    }
  }, [state, router]);

  // Handle image URL preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setImagePreview(value || null);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back Button */}
        <div>
          <Button
            variant="ghost"
            asChild
            className="gap-2 rounded-xl text-muted-foreground hover:text-foreground"
          >
            <Link href={userDashboardHref}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="overflow-hidden border-border/60 shadow-lg">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-[#00a17f] to-[#00876a]" />

          <CardContent className="pb-6">
            {/* Avatar + Name */}
            <div className="flex flex-col items-center -mt-16 sm:flex-row sm:items-end sm:gap-5">
              <Avatar className="h-28 w-28 border-4 border-background shadow-lg">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : (
                  <AvatarFallback className="bg-[#00a17f]/10 text-[#00a17f] text-2xl font-bold">
                    {user.name?.charAt(0).toUpperCase() || (
                      <User className="h-10 w-10" />
                    )}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="mt-4 text-center sm:mb-2 sm:text-left">
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <div className="mt-1 flex items-center justify-center gap-2 sm:justify-start">
                  <Badge
                    className={`border ${roleBadgeStyles[user.role] || roleBadgeStyles.TENANT}`}
                  >
                    {user.role}
                  </Badge>
                  {user.isBanned && <Badge variant="destructive">Banned</Badge>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Card */}
        <Card className="border-border/60 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Account Information</CardTitle>
            <CardDescription>
              Your personal account details and role information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00a17f]/10 text-[#00a17f]">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="text-sm font-medium text-foreground">{user.name}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00a17f]/10 text-[#00a17f]">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Email Address</p>
                <p className="text-sm font-medium text-foreground break-all">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/30 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00a17f]/10 text-[#00a17f]">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Role</p>
                <p className="text-sm font-medium text-foreground capitalize">
                  {user.role?.toLowerCase()}
                </p>
              </div>
            </div>

            {/* Member Since */}
            {user.createdAt && (
              <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-muted/30 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00a17f]/10 text-[#00a17f]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="text-sm font-medium text-foreground">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Profile Form Card */}
        <Card className="border-border/60 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Edit Profile</CardTitle>
            <CardDescription>
              Update your personal information. Changes will be saved
              immediately.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-11 h-12 text-base"
                    defaultValue={user.name}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-11 h-12 text-base"
                    defaultValue={user.email}
                    required
                  />
                </div>
              </div>

              {/* Profile Image Field */}
              <div className="space-y-2">
                <Label htmlFor="image" className="text-sm font-semibold">
                  Profile Image URL
                </Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="image"
                    name="image"
                    type="url"
                    placeholder="https://example.com/avatar.png"
                    className="pl-11 h-12 text-base"
                    defaultValue={user.image || ""}
                    onChange={handleImageChange}
                  />
                </div>
                {imagePreview && (
                  <div className="mt-2 flex items-center gap-3">
                    <Avatar className="h-16 w-16 border-2 border-border">
                      <AvatarImage src={imagePreview} alt="Preview" />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                      Image preview
                    </span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={pending}
                className="w-full h-12 text-base bg-[#00a17f] hover:bg-[#00876a] text-white font-semibold transition-colors shadow-md"
              >
                {pending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving changes...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Action */}
        <div className="flex justify-center pt-2">
          <Button
            asChild
            className="gap-2 bg-[#00a17f] hover:bg-[#00876a] text-white rounded-xl"
          >
            <Link href={userDashboardHref}>
              <LayoutDashboard className="h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
