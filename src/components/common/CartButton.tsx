import { Check, ShoppingBag } from "lucide-react";
import IconButton from "./IconButton";
import { useState, type ComponentPropsWithoutRef } from "react";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { useAuthContext } from "@/context/AuthContext";
import type React from "react";
import { toast } from "sonner";

type CartButtonProps = {
  productId: number;
  quantity: number;
} & ComponentPropsWithoutRef<"button">;

const CartButton = ({ productId, quantity, ...props }: CartButtonProps) => {
  const { isAuthenticated } = useAuthContext();
  const { mutate, isPending } = useAddToCart();

  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAuthenticated) {
      try {
        mutate(
          { productId, quantity },
          {
            onSuccess: () => {
              setIsSuccess(true);
              setTimeout(() => setIsSuccess(false), 1500);
            },
          },
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.info("Please log in to add product to cart.");
    }
  };

  let content = "Add to Cart";
  let icon = <ShoppingBag />;

  if (isPending) {
    content = "Adding to Cart";
  }

  if (isSuccess) {
    content = "Added to Cart";
    icon = <Check />;
  }

  return (
    <IconButton {...props} onClick={handleAddToCart}>
      {icon}
      {content}
    </IconButton>
  );
};
export default CartButton;
