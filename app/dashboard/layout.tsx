import DashboardSidebar from "./components/DashboardSidebar";
import DashboardHeader from "./components/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <DashboardSidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
