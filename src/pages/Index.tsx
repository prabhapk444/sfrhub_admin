
import { useAuthSession } from "@/hooks/useAuthSession";
import LoginCard from "@/components/auth/LoginCard";

const Index = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
    error,
    success,
    handleSubmit
  } = useAuthSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">Admin Portal</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Sign in to access your dashboard</p>
        </div>

        <LoginCard
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          success={success}
        />

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} <a href="https://thriveboost.in" className="hover:underline">Thrive Boost</a>. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Index;
