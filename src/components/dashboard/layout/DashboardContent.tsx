
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UsersTable } from "@/components/dashboard/UsersTable";
import { OrdersTable } from "@/components/dashboard/OrdersTable";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { CategoriesSection } from "@/components/dashboard/CategoriesSection";
import { ServicesSection } from "@/components/dashboard/ServicesSection";
import { TabType } from "@/components/dashboard/users/types";

interface DashboardContentProps {
  activeTab: TabType;
  onCardClick: (tab: TabType) => void;
}

export const DashboardContent = ({ activeTab, onCardClick }: DashboardContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardStats onCardClick={onCardClick} />;
      case "categories": return <CategoriesSection />;
      case "services": return <ServicesSection />;
      case "users": return <UsersTable />;
      case "orders": return <OrdersTable />;
      case "analytics": return <AnalyticsSection />;
      default: return <DashboardStats onCardClick={onCardClick} />;
    }
  };

  return (
    <main className="flex-1 w-full overflow-hidden">
      <div className="animate-scale-in">
        {renderContent()}
      </div>
      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} <a href="https://thriveboost.in" className="hover:underline">Thrive Boost</a>. All rights reserved.
      </p>
    </main>
  );
};
