import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileText, CheckCircle, Clock } from "lucide-react";
import { getLandlordProperties, getLandlordRequests } from "../_action/landlord/landlordActions";

export default async function LandlordDashboardPage() {
  const [propertiesRes, requestsRes] = await Promise.all([
    getLandlordProperties(),
    getLandlordRequests(),
  ]);

  const properties = propertiesRes.success ? propertiesRes.data : [];
  const requests = requestsRes.success ? requestsRes.data : [];

  const pendingRequests = Array.isArray(requests) ? requests.filter((r: any) => r.status === "PENDING").length : 0;
  const approvedRequests = Array.isArray(requests) ? requests.filter((r: any) => r.status === "APPROVED").length : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Landlord Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of your properties and rental requests.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Array.isArray(properties) ? properties.length : 0}</div>
            <p className="text-xs text-muted-foreground">
              Listed on RentNest
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Array.isArray(requests) ? requests.length : 0}</div>
            <p className="text-xs text-muted-foreground">
              All time rental requests
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              Require your approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Rentals</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedRequests}</div>
            <p className="text-xs text-muted-foreground">
              Successfully rented out
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}