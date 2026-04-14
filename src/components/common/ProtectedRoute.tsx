import { useAuthContext } from "@/context/AuthContext";
import { Spinner } from "../ui/spinner";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading)
    return (
      <div className="h-[90vh] flex items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  if (!isAuthenticated) return <Navigate to={"/auth/login"} replace />;

  return children;
};
export default ProtectedRoute;
