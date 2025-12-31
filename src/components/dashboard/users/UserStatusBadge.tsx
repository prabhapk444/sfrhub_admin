
import React from "react";

type UserStatus = "active" | "inactive" | "expired";

interface UserStatusBadgeProps {
  status: UserStatus;
}

export const UserStatusBadge: React.FC<UserStatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 rounded text-white animate-fade-in text-xs sm:text-sm whitespace-nowrap inline-flex items-center justify-center ${
        status === "active"
          ? "bg-green-500"
          : status === "expired"
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
    >
      {status}
    </span>
  );
};
