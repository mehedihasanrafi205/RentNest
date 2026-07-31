"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { IProperty } from "@/types";
import { deletePropertyAdmin } from "../../_action/admin/adminActions";

export default function AdminPropertiesTable({ initialProperties }: { initialProperties: IProperty[] }) {
  const [properties, setProperties] = useState<IProperty[]>(initialProperties);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    toast("Delete this property?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          setLoadingId(id);
          const res = await deletePropertyAdmin(id);
          if (res.success) {
            setProperties((prev) => prev.filter((p) => p.id !== id));
            toast.success("Property deleted successfully.");
          } else {
            toast.error(res.message || "Failed to delete property.");
          }
          setLoadingId(null);
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Content Moderation</h2>
        <p className="text-muted-foreground">Review and moderate all property listings.</p>
      </div>

      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Title</TableHead>
              <TableHead>Landlord</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                  No properties found.
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{property.landlord?.name || "Unknown"}</span>
                      <span className="text-xs text-muted-foreground">{property.landlord?.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        property.status === "AVAILABLE"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : property.status === "RENTED"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {property.status}
                    </span>
                  </TableCell>
                  <TableCell>${property.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/properties/${property.id}`} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        disabled={loadingId === property.id}
                        onClick={() => handleDelete(property.id)}
                      >
                        {loadingId === property.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
