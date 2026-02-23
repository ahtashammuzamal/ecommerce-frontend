import LineSpacer from "../common/LineSpacer";

type OrderSummaryProps = {
  className?: string;
};

import OrderItem from "./OrderItem";
import { useCart } from "@/hooks/cart/useCart";
import { calculateSubtotal } from "@/lib/utils";

const OrderSummary = ({ className }: OrderSummaryProps) => {
  const { data } = useCart();

  return (
    <div className={`${className} bg-white p-6 rounded-xl`}>
      <p className="font-medium text-primary mb-4">Order Summary</p>
      <div className="space-y-8">
        <div className="flex justify-between items-center [&>p]:text-sm">
          <p>Subtotal (3 items)</p>
          <p>${calculateSubtotal(data?.cart.cartItems)}</p>
        </div>
        <LineSpacer className={"max-w-none bg-black/10"} />
        <div className="space-y-4">
          {data?.cart.cartItems.map((item, index) => (
            <OrderItem
              key={index}
              imageURL={item.product.images[0]}
              title={item.product.title}
              category={item.product.category.name}
              subtotal={item.product.price * item.quantity}
            />
          ))}
          <LineSpacer className={"max-w-none bg-black/10"} />
        </div>
        <div className="flex justify-between items-center [&>p]:text-primary [&>p]:font-semibold">
          <p>Total</p>
          <p>${calculateSubtotal(data?.cart.cartItems)}</p>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
