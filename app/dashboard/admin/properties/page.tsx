import { getAllProperties } from "../../_action/admin/adminActions";
import AdminPropertiesTable from "../../_components/admin/AdminPropertiesTable";

export default async function AdminPropertiesPage() {
  const propertiesRes = await getAllProperties();
  const properties = propertiesRes.success ? propertiesRes.data : [];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <AdminPropertiesTable initialProperties={properties} />
    </div>
  );
}