
import React, { useState } from "react";
import { Check, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import FormError from "@/components/forms/FormError";
import PasswordVisibilityToggle from "./PasswordVisibilityToggle";

interface LoginFormProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  error: string;
  success: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
  isLoading,
  error,
  success,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {success && (
        <Alert className="mb-4 bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-100">
          <Check className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      {error && <FormError message={error} />}

      <div className="space-y-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-gray-700 dark:text-gray-200 block"
        >
          Username
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-500">
            <User size={18} />
          </div>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
            required
            autoComplete="username"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700 dark:text-gray-200 block"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 dark:text-gray-500">
            <Lock size={18} />
          </div>
          <Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400"
            required
            autoComplete="current-password"
          />
          <PasswordVisibilityToggle
            isVisible={isPasswordVisible}
            onToggle={togglePasswordVisibility}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full mt-6 text-white hover:bg-primary-dark dark:text-black hover:text-white"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;
