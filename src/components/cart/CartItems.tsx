import CartItem from "./CartItem";
import { toast } from "sonner";
import { useCart } from "@/hooks/cart/useCart";

type CartItemsProps = {
  className?: string;
};

const CartItems = ({ className }: CartItemsProps) => {
  const { data, isLoading, isError } = useCart();

  if (isLoading) return <p>Loading...</p>;

  if (isError) return toast.error("Error loading cart");

  return (
    <div className={`${className}`}>
      {data?.cart.cartItems.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
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
