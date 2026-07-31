import { getAllUsers } from "../../_action/admin/adminActions";
import AdminUsersTable from "../../_components/admin/AdminUsersTable";

export default async function AdminUsersPage() {
  const usersRes = await getAllUsers();
  const users = usersRes.success ? usersRes.data : [];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <AdminUsersTable initialUsers={users} />
    </div>
  );
}