import { AlertCircle } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div
      className="flex items-center gap-x-2 text-sm mt-1 
                 text-destructive dark:text-red-400 transition-colors duration-200"
    >
      <AlertCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
