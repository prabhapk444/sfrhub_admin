
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DashboardNavigation } from "./DashboardNavigation";
import { TabType } from "@/components/dashboard/users/types";

interface DashboardSidebarProps {
  activeTab: TabType;
  isMobile: boolean;
  mobileMenuOpen: boolean;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
  onMobileMenuClose: () => void;
}

export const DashboardSidebar = ({ 
  activeTab, 
  isMobile, 
  mobileMenuOpen, 
  onTabChange, 
  onLogout, 
  onMobileMenuClose 
}: DashboardSidebarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
  className="w-full md:w-64 
             bg-white dark:bg-gray-800 
             text-gray-900 dark:text-gray-100 
             rounded-lg shadow-sm 
             border border-gray-200 dark:border-gray-700 
             p-4 hidden md:block 
             h-auto md:h-[calc(100vh-7rem)] 
             sticky top-[76px] 
             transition-colors duration-300 
             animate-fade-in"
>
  <nav>
    <DashboardNavigation
      activeTab={activeTab}
      isMobile={false}
      onTabChange={onTabChange}
      onLogout={onLogout}
    />
  </nav>
</aside>


      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={onMobileMenuClose}>
        <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
          <div className="h-full bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold">Menu</h2>
            </div>
            <nav>
              <DashboardNavigation
                activeTab={activeTab}
                isMobile={true}
                onTabChange={onTabChange}
                onLogout={onLogout}
                onMobileMenuClose={onMobileMenuClose}
              />
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
