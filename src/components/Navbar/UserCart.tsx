import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/hooks/tanstack/cart/useCart";
import { Loader2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const UserCart = () => {
  const { data, isPending } = useCart();
  const { isAuthenticated } = useAuthContext();

  return (
    <Link to={"/cart"} className="relative">
      <ShoppingBag size={18} className="theme-dark-text" />
      <div className="absolute bg-primary w-4 h-4 rounded-full flex items-center justify-center text-white bottom-2 left-3 text-[8px]">
        {!isAuthenticated ? "0" : isPending ? <Loader2 className="h-2 w-2 animate-spin" /> : data?.totalCartItems || 0}
      </div>
    </Link>
  );
};
