import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const UserCart = () => {
  return (
    <Link to={"/cart"}>
      <ShoppingBag size={18} className="theme-dark-text" />
    </Link>
  );
};
