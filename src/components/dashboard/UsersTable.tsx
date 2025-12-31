
import { Button } from "../ui/button";
import { UserTableHeader } from "./users/UserTableHeader";
import { UsersTableContent } from "./users/UsersTableContent";
import { useUsers } from "./users/useUsers";

export const UsersTable = () => {
  const {
    filteredUsers,
    paginatedUsers,
    searchTerm,
    setSearchTerm,
    toggleUserStatus,
    statusFilter,
    setStatusFilter,
    csvHeaders,
    selectedUserIds,
    toggleSelectUser,
    enableSelectedUsers,
    currentPage,
    setCurrentPage,
    totalPages,
    selectAllUsers,
    deselectAllUsers,
  } = useUsers();

  return (
    <div className="space-y-4 w-full overflow-hidden">
     <UserTableHeader
  searchTerm={searchTerm}
  onSearchChange={(e) => setSearchTerm(e.target.value)}
  filteredUsers={filteredUsers}
  csvHeaders={csvHeaders}
  statusFilter={statusFilter}
  onStatusChange={setStatusFilter}
  selectedUserIds={selectedUserIds}
  enableSelectedUsers={enableSelectedUsers}
  selectAllUsers={selectAllUsers}
  deselectAllUsers={deselectAllUsers}
/>


      <UsersTableContent
        paginatedUsers={paginatedUsers}
        toggleUserStatus={toggleUserStatus}
        selectedUserIds={selectedUserIds}
        toggleSelectUser={toggleSelectUser}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-4">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
