import { useCart } from "@/hooks/cart/useCart";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const UserCart = () => {
  const { data } = useCart();

  return (
    <Link to={"/cart"} className="relative">
      <ShoppingBag size={18} className="theme-dark-text" />
      <div className="absolute bg-primary w-4 h-4 rounded-full flex items-center justify-center text-white bottom-2 left-3 text-[8px]">
        {data?.totalCartItems}
      </div>
    </Link>
  );
};
