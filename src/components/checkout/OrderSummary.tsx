import LineSpacer from "../common/LineSpacer";
import type { Product } from "@/types";

type OrderSummaryProps = {
  className?: string;
  products: Product[];
};

import { MOCK_CART } from "@/mock/cart";
import OrderItem from "./OrderItem";

const OrderSummary = ({ className }: OrderSummaryProps) => {
  return (
    <div className={`${className} bg-white p-6 rounded-xl`}>
      <p className="font-medium text-primary mb-4">Order Summary</p>
      <div className="space-y-8">
        <div className="flex justify-between items-center [&>p]:text-sm">
          <p>Subtotal (3 items)</p>
          <p>$727.00</p>
        </div>
        <LineSpacer className={"max-w-none bg-black/10"} />
        <div className="space-y-4">
          {MOCK_CART.cartItems.map((item, index) => (
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
          <p>$727.00</p>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
