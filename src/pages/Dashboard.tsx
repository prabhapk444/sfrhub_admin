
import { useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { TabType } from "@/components/dashboard/users/types";
import { DashboardHeader } from "@/components/dashboard/layout/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/layout/DashboardSidebar";
import { DashboardContent } from "@/components/dashboard/layout/DashboardContent";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromURL = searchParams.get("tab") as TabType || "dashboard";
  const [activeTab, setActiveTab] = useState<TabType>(tabFromURL);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const updateTab = useCallback((tab: TabType) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  }, [setSearchParams]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("auth_token"); 
    navigate("/", { replace: true });
  }, [navigate]);

  const handleMobileMenuToggle = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader 
        isMobile={isMobile}
        onMenuToggle={handleMobileMenuToggle}
      />

      <div className="container mx-auto p-2 sm:p-4 flex flex-col md:flex-row gap-4">
        <DashboardSidebar
          activeTab={activeTab}
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          onTabChange={updateTab}
          onLogout={handleLogout}
          onMobileMenuClose={handleMobileMenuClose}
        />

        <DashboardContent
          activeTab={activeTab}
          onCardClick={updateTab}
        />
      </div>
    </div>
  );
};

export default Dashboard;
