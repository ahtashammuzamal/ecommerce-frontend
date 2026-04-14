import type { CartItem } from "@/types";
import SingleCartItem from "./SingleCartItem";
import type { ComponentPropsWithoutRef } from "react";

type CartItemProps = {
  cartItems?: CartItem[];
} & ComponentPropsWithoutRef<"div">;

const CartItems = ({ cartItems, ...props }: CartItemProps) => {
  return (
    <div {...props}>
      {cartItems?.map((item) => (
        <SingleCartItem
          key={item.id}
          id={item.id}
          imageURL={item.product.images[0]}
          title={item.product.title}
          category={item.product.category?.name}
          price={item.product.price}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
};
export default CartItems;
