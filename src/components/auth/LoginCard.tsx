
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoginForm from "./LoginForm";
import { UserCog } from "lucide-react";

interface LoginCardProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  error: string;
  success: string;
}

const LoginCard: React.FC<LoginCardProps> = ({
  username,
  setUsername,
  password,
  setPassword,
  onSubmit,
  isLoading,
  error,
  success,
}) => {
  return (
    <Card className="w-full shadow-lg border-gray-200 dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="pb-3 flex justify-center">
        <div className="flex flex-col items-center">
          <div className="p-3 rounded-full bg-primary/10 mb-2">
            <UserCog size={32} className="text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-center">Admin Login</h2>
        </div>
      </CardHeader>
      <CardContent>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onSubmit={onSubmit}
          isLoading={isLoading}
          error={error}
          success={success}
        />
      </CardContent>
    </Card>
  );
};

export default LoginCard;
