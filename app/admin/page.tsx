import { isAdminLoggedIn } from "@/lib/auth";
import AdminDashboard from "./dashboard";
import { AdminLogin } from "./AdminLogin";

export default async function AdminPage() {
  const loggedIn = await isAdminLoggedIn();
  return loggedIn ? <AdminDashboard /> : <AdminLogin />;
}
