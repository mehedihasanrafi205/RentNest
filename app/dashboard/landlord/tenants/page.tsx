import { getLandlordRequests } from "../../_action/landlord/landlordActions";
import LandlordTenantsTable from "../../_components/landlord/LandlordTenantsTable";

export default async function TenantsPage() {
  // We use the requests endpoint because it contains all rentals (including active/completed) for the landlord
  const rentalsRes = await getLandlordRequests();
  const rentals = rentalsRes.success ? rentalsRes.data : [];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <LandlordTenantsTable initialRentals={rentals} />
    </div>
  );
}
