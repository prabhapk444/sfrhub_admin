
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getTheme(): "dark" | "light" {

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  
 
  return "light";
}

export function validateCredentials(username: string, password: string): { isValid: boolean } {
  // Special hard-coded credentials
  if (username === "Sfrcadmin" && password === "Admin4533#") {
    return { isValid: true };
  }
  
  return { isValid: false };
}

export function isAuthenticated(): boolean {
  const authToken = localStorage.getItem("auth_token");
  if (!authToken) return false;
  
  try {
    const token = JSON.parse(authToken);
    if (!token.value || !token.expires) return false;
    
    // Check if token is expired
    if (Date.now() > token.expires) {
      localStorage.removeItem("auth_token");
      return false;
    }
    
    return true;
  } catch (err) {
    localStorage.removeItem("auth_token");
    return false;
  }
}

export function logout(): void {
  localStorage.removeItem("auth_token");
  window.location.href = "/";
}
