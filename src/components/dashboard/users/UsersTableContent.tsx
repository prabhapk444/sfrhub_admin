
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserActionButton } from "./UserActionButton";
import { User } from "./types";

interface UsersTableContentProps {
  filteredUsers: User[];
  toggleUserStatus: (user: User) => Promise<void>;
   
}

export const UsersTableContent: React.FC<UsersTableContentProps> = ({
  filteredUsers,
  toggleUserStatus,
}) => {
  return (
    <div className="border rounded-md overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Email</TableHead>
            <TableHead className="whitespace-nowrap">Phone</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="whitespace-nowrap">{user.fullName}</TableCell>
                <TableCell className="whitespace-nowrap">{user.email}</TableCell>
                <TableCell className="whitespace-nowrap">{user.phone}</TableCell>
                <TableCell>
                  <UserStatusBadge status={user.status} />
                </TableCell>
                <TableCell>
                  <UserActionButton 
                    status={user.status} 
                    onToggleStatus={() => toggleUserStatus(user)} 
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
    </div>
  );
};
