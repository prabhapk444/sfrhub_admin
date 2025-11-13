
import { Users, Package, Folder, Wrench} from "lucide-react";
import { useDashboardStats } from "./stats/useDashboardStats";
import { StatCard } from "./stats/StatCard";
import { QuickStats } from "./stats/QuickStats";
import { TabType } from "./users/types";

export const DashboardStats = ({ onCardClick }: { onCardClick: (tab: TabType) => void }) => {
  const { 
    certificateCount, 
    usersCount, 
    orderStatusCounts, 
    servicesCount,
    isLoading
  } = useDashboardStats();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={usersCount}
          icon={<Users className="h-4 w-4 text-blue-500" />}
          className="bg-white dark:bg-gray-800 cursor-pointer"
          onClick={() => onCardClick("users")}
          isLoading={isLoading}
        />

        <StatCard
          title="Total Inquiries"
          value={orderStatusCounts.total}
          icon={<Package className="h-4 w-4 text-green-500" />}
          className="bg-white dark:bg-gray-800 cursor-pointer"
          onClick={() => onCardClick("orders")}
          isLoading={isLoading}
        />

        <StatCard
          title="Total Services"
          value={servicesCount}
          icon={<Wrench className="h-4 w-4" />}
          className="bg-white dark:bg-gray-800 cursor-pointer"
          onClick={() => onCardClick("services")}
          isLoading={isLoading}
        />

        <StatCard
          title="Total Categories"
          value={certificateCount}
          icon={<Folder className="h-4 w-4" />}
          className="bg-white dark:bg-gray-800 cursor-pointer"
          onClick={() => onCardClick("categories")}
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <QuickStats orderStatus={orderStatusCounts} />
      </div>
    </div>
  );
};
