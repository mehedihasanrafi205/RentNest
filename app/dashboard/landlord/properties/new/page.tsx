"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";
import Link from "next/link";
// We should import a select component if it was fully implemented. Since it's shadcn, we'd use it if available, else a native select for now.

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [amenitiesStr, setAmenitiesStr] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real implementation we would:
    // 1. Upload the image to an external service (ImgBB/Cloudinary)
    // 2. Format data and call server action to POST to backend
    
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard/landlord/properties");
    }, 1500); // Simulate API call delay
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/landlord/properties">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Add New Property</h2>
          <p className="text-muted-foreground">List a new property on RentNest.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 rounded-xl border border-border p-6 bg-card">
          <div className="space-y-2">
            <Label htmlFor="title">Property Title</Label>
            <Input id="title" required placeholder="e.g. Modern Apartment in Downtown" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              required 
              placeholder="Describe the property..." 
              className="min-h-[120px]" 
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" required placeholder="e.g. Dhaka, Bangladesh" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Monthly Price ($)</Label>
              <Input id="price" type="number" min="0" required placeholder="e.g. 1500" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (comma separated)</Label>
            <Input 
              id="amenities" 
              value={amenitiesStr} 
              onChange={(e) => setAmenitiesStr(e.target.value)} 
              placeholder="e.g. WiFi, Parking, AC" 
            />
          </div>

          <div className="space-y-2">
            <Label>Property Image</Label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-border px-6 py-10">
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden="true" />
                <div className="mt-4 flex text-sm leading-6 text-muted-foreground justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none hover:underline"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Property
          </Button>
        </div>
      </form>
    </div>
  );
}
