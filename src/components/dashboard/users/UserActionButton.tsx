
import React from "react";
import { Button } from "@/components/ui/button";

interface UserActionButtonProps {
  status: "active" | "inactive" | "expired";
  onToggleStatus: () => Promise<void>;
}

export const UserActionButton: React.FC<UserActionButtonProps> = ({ 
  status, 
  onToggleStatus 
}) => {
  return (
    <Button
      size="sm"
      onClick={onToggleStatus}
      disabled={status === "expired"}
    >
      {status === "active" ? "Disable" : "Enable"}
    </Button>
  );
};
