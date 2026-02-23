import IconButton from "@/components/common/IconButton";
import { ArrowRight, CircleCheckBig } from "lucide-react";

const CheckoutSuccess = () => {
  return (
    <div className="max-w-150 min-h-screen mx-auto flex flex-col items-center text-center justify-center gap-8 px-4">
      <CircleCheckBig className="text-green-400" size={40}/>
      <h4>Thank you for your order!</h4>
      <p>Your order has been confirmed and will be shipped soon.</p>
      <div className="space-y-6 bg-white py-6 w-full rounded-xl border border-black/15 px-2">
        <div>
          <p>Order number</p>
          <p className="font-semibold font-serif text-primary">ORD-00663892</p>
        </div>
        <p className="text-sm">
          We've sent a confirmation email with your order details.
        </p>
      </div>
      <div className="space-x-4">
        <IconButton to="/account/orders" variant={'secondary'}>View Orders</IconButton>
        <IconButton to="/products">
          Continue Shopping <ArrowRight />
        </IconButton>
      </div>
    </div>
  );
};
export default CheckoutSuccess;
