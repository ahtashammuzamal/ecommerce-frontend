import { ShoppingBag } from "lucide-react";
import IconButton from "./IconButton";
import type { ComponentPropsWithoutRef } from "react";

type CartButtonProps = {
  className?: string;
  isPending: boolean;
} & ComponentPropsWithoutRef<"button">;

const CartButton = ({ className, isPending, ...props }: CartButtonProps) => {
  return (
    <IconButton className={`${className} theme-dark-bg`} {...props}>
      {" "}
      <ShoppingBag />
      {isPending ? "Adding to Cart..." : "Add to Card"}
    </IconButton>
  );
};
export default CartButton;
