"use client";

import React, { useState } from "react";
import { Star, Loader2, MessageSquareText, CheckCircle2, PlusCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Booking } from "@/types";
import { submitReviewAction } from "../../_action/tenant/reviewActions";

export interface ReviewItem {
  id: string;
  propertyId: string;
  rating: number;
  comment: string;
  createdAt?: string;
}

interface ReviewsViewProps {
  bookings: Booking[];
  existingReviews?: ReviewItem[];
}

export function ReviewsView({ bookings, existingReviews = [] }: ReviewsViewProps) {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Map propertyId -> review object for quick lookup
  const reviewMap = new Map<string, ReviewItem>(
    existingReviews.map((r) => [r.propertyId, r])
  );

  // Deduplicate eligible properties
  const uniqueProperties = Array.from(
    new Map(
      bookings
        .filter((b) => b && b.property)
        .map((b) => [b.propertyId, b.property])
    ).values()
  );

  const handleSelectProperty = (propId: string) => {
    // Prevent selecting already reviewed property
    if (reviewMap.has(propId)) {
      toast.info("You have already submitted a review for this property.");
      return;
    }

    setSelectedPropertyId(propId);
    setRating(5);
    setComment("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPropertyId) return;

    setLoading(true);
    const res = await submitReviewAction(selectedPropertyId, rating, comment);

    if (res.success) {
      toast.success("Review submitted successfully!");
      setSelectedPropertyId(null);
      setRating(5);
      setComment("");
    } else {
      toast.error(res.message || "Failed to submit review.");
    }
    setLoading(false);
  };

  if (uniqueProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center mt-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#00a17f]/10 text-[#00a17f] mb-4">
          <MessageSquareText className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          No Properties to Review
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mt-1">
          You need an approved booking to write a review.
        </p>
      </div>
    );
  }

  const selectedProperty = uniqueProperties.find((p) => p?.id === selectedPropertyId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          My Reviews
        </h1>
        <p className="text-sm text-muted-foreground">
          Write reviews for your stayed properties. Each property can only be reviewed once.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Left Side: Property List with Review Status */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-foreground">
            Booked Properties ({uniqueProperties.length})
          </h2>

          {uniqueProperties.map((prop) => {
            if (!prop) return null;
            const existingReview = reviewMap.get(prop.id);
            const isSelected = selectedPropertyId === prop.id;

            return (
              <Card
                key={prop.id}
                className={`transition-all border ${
                  existingReview
                    ? "bg-muted/30 border-border/60 opacity-90 cursor-not-allowed"
                    : isSelected
                    ? "border-[#00a17f] ring-2 ring-[#00a17f]/20 shadow-md bg-[#00a17f]/5 cursor-pointer"
                    : "hover:border-[#00a17f]/50 hover:shadow-sm cursor-pointer bg-card"
                }`}
                onClick={() => !existingReview && handleSelectProperty(prop.id)}
              >
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-base">
                        {prop.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{prop.location}</p>
                    </div>

                    {/* Status Badge */}
                    {existingReview ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 px-3 py-1 rounded-full shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Reviewed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-100 dark:bg-amber-950/40 dark:text-amber-400 px-3 py-1 rounded-full shrink-0">
                        <PlusCircle className="h-3.5 w-3.5" /> Pending
                      </span>
                    )}
                  </div>

                  {/* Show summary of already submitted review */}
                  {existingReview ? (
                    <div className="pt-2 border-t border-border/60 space-y-1 bg-background/60 p-2.5 rounded-lg">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-3.5 w-3.5"
                            fill={i < existingReview.rating ? "currentColor" : "none"}
                          />
                        ))}
                        <span className="font-bold text-xs text-foreground ml-1">
                          {existingReview.rating}.0 / 5.0
                        </span>
                      </div>
                      <p className="text-xs text-foreground/80 italic line-clamp-2">
                        &quot;{existingReview.comment}&quot;
                      </p>
                    </div>
                  ) : null}

                  <div className="flex justify-end pt-1">
                    {existingReview ? (
                      <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                        <Lock className="h-3 w-3" /> Already Reviewed
                      </span>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#00a17f] hover:text-[#00a17f] hover:bg-[#00a17f]/10 p-0 h-auto text-xs font-semibold"
                      >
                        Write Review →
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Right Side: Review Form (Only Active for Unreviewed Properties) */}
        <div className="sticky top-6">
          {selectedPropertyId ? (
            <Card className="border border-border shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Write a Review</CardTitle>
                <CardDescription className="text-xs">
                  {selectedProperty?.title}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Rating
                    </label>
                    <div className="flex items-center gap-2 bg-muted/30 p-2.5 rounded-xl border border-border/50 justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-1.5 rounded-lg transition-all transform hover:scale-110 ${
                            star <= rating
                              ? "text-amber-500"
                              : "text-muted-foreground/30 hover:text-amber-300"
                          }`}
                        >
                          <Star
                            className="h-8 w-8"
                            fill={star <= rating ? "currentColor" : "none"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Your Feedback / Comment
                    </label>
                    <Textarea
                      placeholder="How was the property cleanliness, landlord behavior, or location?"
                      className="min-h-[130px] resize-none"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-1/3"
                      onClick={() => setSelectedPropertyId(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-2/3 bg-[#00a17f] hover:bg-[#00a17f]/90 text-white font-medium"
                    >
                      {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Submit Review
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full min-h-[340px] flex flex-col items-center justify-center border border-dashed border-border rounded-xl bg-card/40 text-center p-6 space-y-3">
              <div className="p-3 bg-muted/60 rounded-full text-muted-foreground">
                <Star className="h-8 w-8" />
              </div>
              <p className="text-foreground font-semibold">Select a Pending Property</p>
              <p className="text-xs text-muted-foreground max-w-xs">
                Click on any pending property from the left list to submit your review. Already reviewed properties are locked.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}