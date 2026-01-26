import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

const Checkout = () => {
  return (
    <div className="max-w-300 min-h-screen my-8 mx-auto flex lg:flex-row flex-col items-center gap-8 px-4">
      <CheckoutForm className={"lg:flex-2"} />
      <OrderSummary className={"lg:flex-1 w-full"} />
    </div>
  );
};
export default Checkout;
