import type { OrderItem, OrderStatus } from "@/types";
import { Link } from "react-router-dom";
import Status from "./Status";
import { organizeDate, truncateTitle } from "@/lib/utils";
import { Button } from "../ui/button";
import { cancelUserOrder } from "@/api/orders.api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";

type OrderCardProps = {
  id: number;
  createdAt: string;
  orderItems: OrderItem[];
  total: number;
  status: OrderStatus;
};

const OrderCard = ({
  id,
  createdAt,
  orderItems,
  total,
  status,
}: OrderCardProps) => {
  const queryClient = useQueryClient();

  const handleCancelOrder = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure to cancel this order?");
    if (!isConfirmed) return;

    try {
      await cancelUserOrder(id);
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORDERS] });
      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error in cancelling your order");
    }
  };

  return (
    <div className="rounded-xl border border-primary/20 overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-accent">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="[&>p]:text-sm">
            <p>Order number</p>
            <p className="text-primary">ORD-{id}</p>
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
                {truncateTitle(orderItem.product.title, 30)}
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

      <div className="p-6">
        {status === "PENDING" && (
          <Button
            variant={"outline"}
            className="h-8  border border-primary cursor-pointer"
            onClick={() => handleCancelOrder(id)}
          >
            Cancel Order
          </Button>
        )}
      </div>
    </div>
  );
};
export default OrderCard;
