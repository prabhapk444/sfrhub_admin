
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
};

};

