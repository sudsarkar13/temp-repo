import { Sidebar } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="hidden lg:block w-64 border-r">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold">Admin Dashboard</h2>
            <div className="space-y-1">
              <Sidebar.Link href="/admin">Dashboard</Sidebar.Link>
              <Sidebar.Link href="/admin/projects">Projects</Sidebar.Link>
              <Sidebar.Link href="/admin/messages">Messages</Sidebar.Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <LogoutButton />
        </div>
      </Sidebar>
      <main className="flex-1 p-8">
        {children}
      </main>
      <Toaster />
    </div>
  );
} 