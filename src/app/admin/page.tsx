import { redirect } from "next/navigation";

export default function AdminIndex() {
  // Redirect to profile as default admin page
  redirect("/admin/profile");
}

