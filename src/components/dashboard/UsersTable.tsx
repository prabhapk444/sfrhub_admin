
import React from "react";
import { UserTableHeader } from "./users/UserTableHeader";
import { UsersTableContent } from "./users/UsersTableContent";
import { useUsers } from "./users/useUsers";

export const UsersTable = () => {
  const {
    filteredUsers,
    searchTerm,
    setSearchTerm,
    toggleUserStatus,
    csvHeaders,
  } = useUsers();

  return (
    <div className="space-y-4 w-full overflow-hidden">
      <UserTableHeader
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filteredUsers={filteredUsers}
        csvHeaders={csvHeaders}
      />

      <UsersTableContent
        filteredUsers={filteredUsers}
        toggleUserStatus={toggleUserStatus}
      />
    </div>
  );
};
