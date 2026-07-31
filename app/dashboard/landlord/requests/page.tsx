import { getLandlordRequests } from "../../_action/landlord/landlordActions";
import LandlordRequestsTable from "../../_components/landlord/LandlordRequestsTable";

export default async function RequestsPage() {
  const requestsRes = await getLandlordRequests();
  const requests = requestsRes.success ? requestsRes.data : [];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <LandlordRequestsTable initialRequests={requests} />
    </div>
  );
}