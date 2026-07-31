"use client";

import React, { useState } from "react";
import { Star, Loader2, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Booking } from "@/types";
import { submitReviewAction } from "../../_action/tenant/reviewActions";

export function ReviewsView({ bookings }: { bookings: Booking[] }) {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set());

  // Deduplicate properties (since user could have booked the same property twice)
  const uniqueProperties = Array.from(
    new Map(bookings.map((b) => [b.propertyId, b.property])).values()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPropertyId) return;

    setLoading(true);
    const res = await submitReviewAction(selectedPropertyId, rating, comment);
    
    if (res.success) {
      alert("Review submitted successfully!");
      setSubmittedIds((prev) => new Set(prev).add(selectedPropertyId));
      setSelectedPropertyId(null);
      setRating(5);
      setComment("");
    } else {
      alert(res.message || "Failed to submit review.");
    }
    setLoading(false);
  };

  if (uniqueProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center mt-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00a17f]/10 text-[#00a17f] mb-4">
          <MessageSquareText className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No Properties to Review</h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-1">
          You need an approved booking to write a review.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">My Reviews</h1>
        <p className="text-sm text-muted-foreground">Share your experience about the properties you've rented.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Eligible Properties</h2>
          {uniqueProperties.map((prop) => {
            if (!prop) return null;
            const isSubmitted = submittedIds.has(prop.id);

            return (
              <Card 
                key={prop.id} 
                className={`cursor-pointer transition-all ${
                  selectedPropertyId === prop.id 
                    ? "border-[#00a17f] ring-1 ring-[#00a17f] shadow-md" 
                    : "hover:border-[#00a17f]/50 hover:shadow-sm"
                }`}
                onClick={() => !isSubmitted && setSelectedPropertyId(prop.id)}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-foreground">{prop.title}</h3>
                    <p className="text-xs text-muted-foreground">{prop.location}</p>
                  </div>
                  {isSubmitted ? (
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                      Reviewed
                    </span>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-[#00a17f]">
                      {selectedPropertyId === prop.id ? "Selected" : "Write Review"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div>
          {selectedPropertyId ? (
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
                <CardDescription>Rate your stay and leave a comment.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1 transition-colors ${
                            star <= rating ? "text-amber-500" : "text-muted"
                          }`}
                        >
                          <Star className="h-8 w-8" fill={star <= rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Review</label>
                    <Textarea 
                      placeholder="Share details of your experience at this property..."
                      className="min-h-[120px]"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-[#00a17f] hover:bg-[#00a17f]/90">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center border border-dashed border-border rounded-xl bg-card/30 text-center p-6">
              <Star className="h-12 w-12 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground font-medium">Select a property to review</p>
              <p className="text-xs text-muted-foreground mt-1">Properties you have booked will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
