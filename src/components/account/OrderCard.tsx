import type { OrderItem, OrderStatus } from "@/types";
import { Link } from "react-router-dom";
import Status from "./Status";
import { organizeDate } from "@/lib/utils";

type OrderCardProps = {
  createdAt: string;
  orderItems: OrderItem[];
  total: number;
  status: OrderStatus;
};

const OrderCard = ({
  createdAt,
  orderItems,
  total,
  status,
}: OrderCardProps) => {
  return (
    <div className="rounded-xl border border-primary/20 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-accent">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="[&>p]:text-sm">
            <p>Order number</p>
            <p className="text-primary">ORD-2024-001</p>
          </div>
          <div className="[&>p]:text-sm">
            <p>Date Placed</p>
            <p className="text-primary">{organizeDate(createdAt)}</p>
          </div>
          <div className="[&>p]:text-sm">
            <p>Total</p>
            <p className="text-primary">${total}</p>
          </div>
        </div>
        <Status status={status} />
      </div>

      <div className="p-6 space-y-4">
        {orderItems.map((orderItem) => (
          <div key={orderItem.id} className="flex gap-4">
            <img
              src={orderItem.product.images[0]}
              alt="product-img"
              className="w-20 h-20 rounded-sm"
            />
            <div className="space-y-2">
              <Link
                to={`/products/${orderItem.product.id}`}
                className="text-[16px] font-semibold text-primary  text-left block hover:underline underline-offset-4"
              >
                {orderItem.product.title}
              </Link>
              <div className="[&>p]:text-sm">
                <p>Qty: {orderItem.quantity}</p>
                <p className="text-primary font-semibold">
                  ${orderItem.subTotal}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OrderCard;
