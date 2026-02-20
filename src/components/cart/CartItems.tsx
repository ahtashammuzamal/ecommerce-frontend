import CartItem from "./CartItem";
import { queryKeys } from "@/constant/query-keys";
import { getUserCartApi } from "@/api/cart.api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

type CartItemsProps = {
  className?: string;
};

const CartItems = ({ className }: CartItemsProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.CART_ITEMS],
    queryFn: () => getUserCartApi().then((res) => res.data),
  });

  if (isLoading) return <p>Loading...</p>;

  console.log(data);

  if (isError)
    return <div className="min-h-96">{toast.error("Error loading cart")}</div>;

  return (
    <div className={`${className}`}>
      {data?.cart.cartItems.map((item) => (
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
