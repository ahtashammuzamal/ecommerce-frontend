import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";

const UserCart = () => {
  return (
    <div className="py-8 flex md:flex-row flex-col gap-8 justify-between items-start">
      <CartItems className={"md:w-2/3"} />
      <OrderSummary className={"md:w-2/6"} />
    </div>
  );
};
export default UserCart;
