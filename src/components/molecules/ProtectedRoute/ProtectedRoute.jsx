import { useAuth } from "@/hooks/context/useAuth";
import { LucideLoader2 } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { auth } = useAuth();

  if (auth.isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <LucideLoader2 className="animate-spin ml-2" />
        Loading...
      </div>
    );
  }

  if (!auth.user || !auth.token) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
}
