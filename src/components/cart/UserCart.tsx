import type { CartItem } from "@/types";
import CartItems from "./CartItems";
import EmptyCart from "./EmptyCart";
import OrderSummary from "./OrderSummary";
import StateHandler from "../common/StateHandler";
import { Spinner } from "../ui/spinner";

type UseCartProps = {
  cartItems: CartItem[];
  subTotal: number;
  totalCartItems?: number;
  isPending: boolean;
  isError: boolean;
};

const UserCart = ({
  cartItems,
  subTotal,
  totalCartItems,
  isPending,
  isError,
}: UseCartProps) => {
  return (
    <StateHandler
      isLoading={isPending}
      loadingFallback={<div className="h-80 flex items-center justify-center"><Spinner className="h-8 w-8"/></div>}
      isError={isError}
      isEmpty={!totalCartItems}
      emptyFallback={<EmptyCart />}
    >
      <div className="py-8 flex md:flex-row flex-col gap-8 justify-between items-start">
        <CartItems className={"md:w-2/3"} cartItems={cartItems} />
        <OrderSummary
          subTotal={subTotal}
          totalCartItems={totalCartItems}
          className="md:w-2/6"
        />
      </div>
    </StateHandler>
  );
};
export default UserCart;
