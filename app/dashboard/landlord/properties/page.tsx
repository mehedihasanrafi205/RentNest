import { getLandlordProperties } from "../../_action/landlord/landlordActions";
import LandlordPropertiesTable from "../../_components/landlord/LandlordPropertiesTable";

export default async function PropertiesPage() {
  const propertiesRes = await getLandlordProperties();
  const properties = propertiesRes.success ? propertiesRes.data : [];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <LandlordPropertiesTable initialProperties={properties} />
    </div>
  );
}