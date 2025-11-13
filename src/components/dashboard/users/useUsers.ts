
import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User } from "./types";
import { toast } from "sonner";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    console.error("Error updating user status:", error);
    toast.error("Failed to update user status");
  }
};

  const filteredUsers = users.filter(
    (user) =>
      (user.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.phone.toString() || "").includes(searchTerm)
  );

  const csvHeaders = [
    { label: "FullName", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    {label:"Status",key:"status"},
  ];

  return {
    users,
    filteredUsers,
    searchTerm,
    setSearchTerm,
    toggleUserStatus,
    csvHeaders,
  };
};
