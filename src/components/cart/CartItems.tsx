import { MOCK_CART } from "@/mock/cart";
import CartItem from "./CartItem";

type CartItemsProps = {
  className?: string;
};

const CartItems = ({ className }: CartItemsProps) => {
  return (
    <div className={`${className}`}>
      {MOCK_CART.cartItems.map((item) => (
        <CartItem
          key={item.id}
          imageURL={item.product.images[0]}
          title={item.product.title}
          category={item.product.category.name}
          price={item.product.price}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
};
export default CartItems;
