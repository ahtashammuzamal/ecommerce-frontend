import { User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

const AccountOptions = () => {
  const { isAuthenticated, logout, user } = useAuthContext();

  const handleLogout = async () => {
    try {
      const res = await logout();
      toast.success(res.message);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <User size={18} className="theme-dark-text cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={"/account/settings"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={"/account/orders"}>Orders</Link>
              </DropdownMenuItem>
              {user?.role === "ADMIN" && (
                <DropdownMenuItem asChild>
                  <Link to={"/admin/orders"}>Dashboard</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to={"/auth/login"}>
          <User size={18} className="theme-dark-text" />
        </Link>
      )}
    </>
  );
};
export default AccountOptions;
