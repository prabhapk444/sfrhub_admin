
import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordVisibilityToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

const PasswordVisibilityToggle: React.FC<PasswordVisibilityToggleProps> = ({
  isVisible,
  onToggle,
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
      aria-label={isVisible ? "Hide password" : "Show password"}
    >
      {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
};

export default PasswordVisibilityToggle;
