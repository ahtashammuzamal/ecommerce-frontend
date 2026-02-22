import { ArrowRight } from "lucide-react";
import IconButton from "../common/IconButton";
import LineSpacer from "../common/LineSpacer";
import { useCart } from "@/hooks/cart/useCart";
import { calculateSubtotal } from "@/lib/utils";

type OrderSummaryProps = {
  className?: string;
};

const OrderSummary = ({ className }: OrderSummaryProps) => {
  const { data } = useCart();

  const subtotal = calculateSubtotal(data?.cart.cartItems);

  return (
    <div className={`${className} bg-secondary p-6 rounded-xl`}>
      <p className="font-medium text-primary mb-4">Order Summary</p>
      <div className="space-y-8">
        <div className="flex justify-between items-center [&>p]:text-sm">
          <p>Subtotal ({data?.totalCartItems} items)</p>
          <p>${subtotal}</p>
        </div>
        <LineSpacer className={"max-w-none bg-black/10"} />
        <div className="space-y-6">
          <div className="flex justify-between items-center [&>p]:text-primary [&>p]:font-semibold">
            <p>Total</p>
            <p>${subtotal}</p>
          </div>
          <div className="space-y-4 ">
            <IconButton className="w-full py-5" to="/checkout">
              Proceed to Checkout
              <ArrowRight />
            </IconButton>
            <IconButton
              variant={"outline"}
              className="w-full py-5"
              to="/products"
            >
              Continue Shopping
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
