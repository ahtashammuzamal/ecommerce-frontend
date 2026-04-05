import { Hexagon, LayoutDashboard, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/products", label: "Products", icon: Hexagon },
    { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  ];

  return (
    <div className="p-4 h-screen w-62 border-primary/20 border-r">
      <h5>Admin</h5>
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
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};
