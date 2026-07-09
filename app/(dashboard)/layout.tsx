import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserMenu from "@/components/dropdowns/UserMenu";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white">
        <div className="mx-auto flex items-center justify-between p-4">
          <span className="flex items-center space-x-10">
            <Link href="/"><h1 className="text-xl font-semibold text-gray-900">ticktock</h1></Link>
            <h2 className="text-sm font-semibold text-gray-500">Timesheets</h2>
          </span>

          <div className="flex items-center gap-4">
            <UserMenu name={session.user?.name} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-6xl">{children}</main>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-400 bg-white p-8 shadow-sm max-w-6xl mx-auto">
        © 2024 tentwenty. All rights reserved.
      </div>
    </div>
  );
}
