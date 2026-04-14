import { ArrowRight } from "lucide-react";
import IconButton from "../common/IconButton";
import LineSpacer from "../common/LineSpacer";
import type { ComponentPropsWithoutRef } from "react";

type OrderSummaryProps = {
  subTotal: number;
  totalCartItems?: number;
} & ComponentPropsWithoutRef<"div">;

const OrderSummary = ({
  subTotal,
  totalCartItems,
  ...props
}: OrderSummaryProps) => {
  return (
    <div className={`bg-secondary p-6 rounded-xl`} {...props}>
      <p className="font-medium text-primary mb-4">Order Summary</p>
      <div className="space-y-8">
        <div className="flex justify-between items-center [&>p]:text-sm">
          <p>Subtotal ({totalCartItems} items)</p>
          <p>${subTotal}</p>
        </div>
        <LineSpacer className={"max-w-none bg-black/10"} />
        <div className="space-y-6">
          <div className="flex justify-between items-center [&>p]:text-primary [&>p]:font-semibold">
            <p>Total</p>
            <p>${subTotal}</p>
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
