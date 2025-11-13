
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu } from "lucide-react";

interface DashboardHeaderProps {
  isMobile: boolean;
  onMenuToggle: () => void;
}

export const DashboardHeader = ({ isMobile, onMenuToggle }: DashboardHeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b p-2 sm:p-4 shadow-sm dark:border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg sm:text-xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isMobile && (
            <Button variant="ghost" size="sm" onClick={onMenuToggle}>
              <Menu size={24} />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
