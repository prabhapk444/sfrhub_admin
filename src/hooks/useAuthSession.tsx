
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateCredentials } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export const useAuthSession = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
   
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      try {
        const token = JSON.parse(authToken);
        if (token.value && token.expires && Date.now() < token.expires) {
          navigate("/dashboard");
        } else {
          localStorage.removeItem("auth_token");
        }
      } catch (error) {
        localStorage.removeItem("auth_token");
      }
    }
    
  
    const lockoutUntil = localStorage.getItem("lockoutUntil");
    if (lockoutUntil && new Date() > new Date(lockoutUntil)) {
      localStorage.removeItem("lockoutUntil");
      localStorage.removeItem("loginAttempts");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const lockoutUntil = localStorage.getItem("lockoutUntil");
    if (lockoutUntil) {
      const remainingTime = Math.ceil((new Date(lockoutUntil).getTime() - new Date().getTime()) / 60000);
      setError(`Account is temporarily locked. Try again in ${remainingTime} minute(s).`);
      return;
    }

    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
  
      await new Promise(resolve => setTimeout(resolve, 800));
      
   
      const result = validateCredentials(username, password);
      
      if (result.isValid) {
        
        localStorage.removeItem("loginAttempts");
        
        // Create auth token
        const token = {
          value: btoa(`${username}:${Date.now()}`),
          expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        };
        localStorage.setItem("auth_token", JSON.stringify(token));
        
        setSuccess("Login successful! Welcome, Admin! Redirecting to dashboard...");
        toast({
          title: "Welcome Admin!",
          description: "Login successful! Redirecting...",
        });

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      // Track failed login attempts
      const attempts = parseInt(localStorage.getItem("loginAttempts") || "0") + 1;
      localStorage.setItem("loginAttempts", attempts.toString());
      
      // Lock account after 5 failed attempts
      if (attempts >= 5) {
        const lockoutTime = new Date();
        lockoutTime.setMinutes(lockoutTime.getMinutes() + 15); 
        localStorage.setItem("lockoutUntil", lockoutTime.toISOString());
        setError("Too many failed attempts. Account locked for 15 minutes.");
      } else {
        setError(`Invalid username or password. ${5 - attempts} attempts remaining before lockout.`);
      }
      
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
    error,
    success,
    handleSubmit
  };
};
