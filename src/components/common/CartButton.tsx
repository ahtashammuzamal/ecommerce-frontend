import { ShoppingBag } from "lucide-react";
import IconButton from "./IconButton";

type CartButtonProps = {
  className?: string;
};

const CartButton = ({ className }: CartButtonProps) => {
  return (
    <IconButton className={`${className} theme-dark-bg`}>
      {" "}
      <ShoppingBag /> Add to Cart
    </IconButton>
  );
};
export default CartButton;
