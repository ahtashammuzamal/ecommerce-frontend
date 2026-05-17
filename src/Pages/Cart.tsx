import UserCart from "@/components/cart/UserCart";
import PageHeader from "@/components/common/PageHeader";
import { useAuthContext } from "@/context/AuthContext";
import { useCart } from "@/hooks/tanstack/cart/useCart";
import { calculateSubtotal } from "@/lib/utils";

const Cart = () => {
  const { data, isPending, isError } = useCart();
  const { isAuthenticated } = useAuthContext();

  return (
    <>
      <PageHeader
        title={"Shopping Cart"}
        description={`${isAuthenticated && !isPending ? data?.totalCartItems : "0"} items`}
      />
      <UserCart
        cartItems={data?.cart?.cartItems || []}
        subTotal={calculateSubtotal(data?.cart?.cartItems)}
        totalCartItems={data?.totalCartItems}
        isPending={isPending}
        isError={isError}
      />
    </>
  );
};
export default Cart;
