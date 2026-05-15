import {
  ArrowUpRight,
  Hexagon,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/AuthContext";

export const Sidebar = ({
  isOpen,
  handleToggle,
}: {
  isOpen: boolean;
  handleToggle: () => void;
}) => {
  const location = useLocation();

  const { logout, user } = useAuthContext();

  console.log(user);

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/products", label: "Products", icon: Hexagon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  ];

  return (
    <div
      className={`fixed md:static bg-background z-50 p-4 h-screen w-62 border-primary/20 border-r flex flex-col justify-between md:translate-x-0 transition-all duration-300 ${isOpen ? "-translate-x-full" : ""}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <Link to={"/"} target="_blank">
            <div className="flex items-center relative">
              <h5>ATELIER</h5>
              <ArrowUpRight className="h-4 w-4 absolute -right-4 -top-1 text-primary/40" />
            </div>
          </Link>
          <X onClick={handleToggle} className="md:hidden" />
        </div>
        <div className="space-y-4 mt-8">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "flex items-center gap-2 text-sm font-semibold py-2.5 px-3 rounded-sm",
                to === location.pathname
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary-foreground",
              )}
              onClick={handleToggle}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            {user?.name?.split(" ")[0].slice(0, 1).toUpperCase()}
          </span>
          <div>
            <p className="text-sm">{user?.name}</p>
            <p className="text-xs">{user?.email}</p>
          </div>
        </div>
        <LogOut
          size={18}
          className="cursor-pointer"
          onClick={async () => await logout()}
        />
      </div>
    </div>
  );
};
