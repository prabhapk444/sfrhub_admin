import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from "./types";
import { toast } from "sonner";
import { writeBatch } from "firebase/firestore";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Items per page

  const toggleSelectUser = (id: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(id)
        ? prev.filter((uid) => uid !== id)
        : [...prev, id]
    );
  };

  const enableSelectedUsers = async () => {
    if (selectedUserIds.length === 0) return;

    try {
      const batch = writeBatch(db);

      selectedUserIds.forEach((id) => {
        const ref = doc(db, "users", id);
        batch.update(ref, { status: "active" });
      });

      await batch.commit();
      setSelectedUserIds([]);
      toast.success("Selected users activated");
    } catch (err) {
      toast.error("Failed to enable users");
    }
  };

  const selectAllUsers = () => {
    const inactiveUsers = filteredUsers.filter(user => user.status !== "active");
    const allIds = inactiveUsers.map(user => user.id);
    setSelectedUserIds(allIds);
  };

  const deselectAllUsers = () => {
    setSelectedUserIds([]);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const toggleUserStatus = async (user: User) => {
    try {
      const newStatus = user.status === "active" ? "inactive" : "active";
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, { status: newStatus });
      toast.success(`User status updated to ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.phone?.toString() || "").includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" ? true : user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const csvHeaders = [
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Status", key: "status" },
  ];

  return {
    users,
    filteredUsers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedUserIds,
    toggleSelectUser,
    enableSelectedUsers,
    toggleUserStatus,
    csvHeaders,
    paginatedUsers,
    currentPage,
    setCurrentPage,
    totalPages,
    selectAllUsers,
    deselectAllUsers,
  };
};
