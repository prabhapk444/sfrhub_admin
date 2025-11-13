
import { memo } from "react";
import { BarChart, LayoutDashboard, Package, Users, LogOut, FolderOpen, Wrench, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TabType } from "@/components/dashboard/users/types";

const NavItem = memo(({ 
  icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <li>
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-2 p-2 rounded-md transition-colors duration-200 ${
        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  </li>
));

NavItem.displayName = "NavItem";

interface DashboardNavigationProps {
  activeTab: TabType;
  isMobile: boolean;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
  onMobileMenuClose?: () => void;
}

export const DashboardNavigation = ({ 
  activeTab, 
  isMobile, 
  onTabChange, 
  onLogout, 
  onMobileMenuClose 
}: DashboardNavigationProps) => {
  const handleTabChange = (tab: TabType) => {
    onTabChange(tab);
    if (isMobile && onMobileMenuClose) {
      onMobileMenuClose();
    }
  };

  return (
    <ul className="space-y-2">
      <NavItem 
        icon={<LayoutDashboard size={18} />} 
        label="Dashboard" 
        isActive={activeTab === "dashboard"}
        onClick={() => handleTabChange("dashboard")}
      />
      
      <NavItem 
        icon={<FolderOpen size={18} />} 
        label="Categories" 
        isActive={activeTab === "categories"}
        onClick={() => handleTabChange("categories")}
      />
      
      <NavItem 
        icon={<Wrench size={18} />} 
        label="Services" 
        isActive={activeTab === "services"}
        onClick={() => handleTabChange("services")}
      />
      
      <NavItem 
        icon={<Users size={18} />} 
        label="Users" 
        isActive={activeTab === "users"}
        onClick={() => handleTabChange("users")}
      />
      
      <NavItem 
        icon={<MessageSquare size={18} />} 
        label="Inquiries" 
        isActive={activeTab === "orders"}
        onClick={() => handleTabChange("orders")}
      />
      
      <NavItem 
        icon={<BarChart size={18} />} 
        label="Analytics" 
        isActive={activeTab === "analytics"}
        onClick={() => handleTabChange("analytics")}
      />
      
      <li className="pt-4">
        <Button variant="ghost" size="sm" className="w-full p-2 rounded-md" onClick={onLogout}>
          <LogOut size={18} className="mr-2" />
          <span>Logout</span>
        </Button>
      </li>
    </ul>
  );
};
