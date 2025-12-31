import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CSVLink } from "react-csv";
import { User } from "./types";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserTableHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filteredUsers: User[];
  csvHeaders: { label: string; key: string }[];
  statusFilter: string;
  onStatusChange: (value: "all" | "active" | "inactive") => void;
  selectedUserIds: string[];
  enableSelectedUsers: () => Promise<void>;
  selectAllUsers: () => void;
  deselectAllUsers: () => void;
}

export const UserTableHeader: React.FC<UserTableHeaderProps> = ({
  searchTerm,
  onSearchChange,
  filteredUsers,
  csvHeaders,
  statusFilter,
  onStatusChange,
  selectedUserIds,
  enableSelectedUsers,
  selectAllUsers,
  deselectAllUsers,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
   
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
        <h1 className="text-2xl font-bold">Users</h1>
        <Input
            placeholder="Search users..."
            className="w-full sm:w-64"
            value={searchTerm}
            onChange={onSearchChange}
          />

           <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
         
        <div className="flex items-center gap-2">
          {(() => {
            const inactiveUsers = filteredUsers.filter(user => user.status !== "active");
            return (
              <>
                <Checkbox
                  checked={selectedUserIds.length === inactiveUsers.length && inactiveUsers.length > 0}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      selectAllUsers();
                    } else {
                      deselectAllUsers();
                    }
                  }}
                />
                <span>Select All Inactive</span>
                {selectedUserIds.length > 0 && (
                  <Button onClick={enableSelectedUsers} size="sm">
                    Enable Selected ({selectedUserIds.length})
                  </Button>
                )}
              </>
            );
          })()}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {filteredUsers.length > 0 && (
            <CSVLink
              data={filteredUsers}
              headers={csvHeaders}
              filename="users.csv"
              className="w-full sm:w-auto"
            >
              <Button 
                variant="outline"
                className="w-full sm:w-auto bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900 dark:hover:to-emerald-900 text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 shadow-sm hover:shadow-md transition-all duration-200 font-medium"
              >
                <Download className="w-4 h-4 mr-2" />
                <span className="hidden xs:inline">Export </span>CSV
              </Button>
            </CSVLink>
          )}
           
        </div>
      </div>
    </div>
  );
};
