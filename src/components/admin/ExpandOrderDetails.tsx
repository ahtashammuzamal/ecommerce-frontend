import { truncateTitle } from "@/lib/utils";
import type { ORDER_STATUS, OrderItem, ShippingAddress } from "@/types";
import HLineBreaker from "../common/HLineBreaker";
import { Button } from "../ui/button";
import { updateOrderStatus } from "@/api/orders.api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";

const ExpandOrderDetails = ({
  orderId,
  shippingAddress,
  orderItems,
  expandedId,
}: {
  orderId: number;
  shippingAddress: ShippingAddress;
  orderItems: OrderItem[];
  expandedId: number | null;
}) => {
  const orderStatus = ["Pending", "Shipped", "Paid", "Delivered", "Cancelled"];

  const queryClient = useQueryClient();

  const handleUpdateStatus = async (id: number, status: ORDER_STATUS) => {
    try {
      await updateOrderStatus(id, { status });
      queryClient.invalidateQueries({ queryKey: [queryKeys.ORDERS] });
      toast.success(`Order status successfully updated`);
    } catch (error) {
      console.error(error);
      toast.error("Error updatating order status");
    }
  };

  return (
    expandedId === orderId && (
      <tr className="border-b border-primary/10">
        <td colSpan={6} className="p-0">
          <div className="w-full px-6 py-4 space-y-6">
            <div className="grid grid-cols-2">
              <div>
                <p className="text-sm text-primary font-bold">Order Details</p>
                <span className="[&>p]:text-sm flex gap-2">
                  <p>Payment:</p>{" "}
                  <p className="text-primary font-semibold">Cash on Delivery</p>
                </span>
                <span className="[&>p]:text-sm flex gap-2">
                  <p>Phone:</p>{" "}
                  <p className="text-primary font-semibold">
                    {shippingAddress.phone}
                  </p>
                </span>
              </div>
              <div className="[&>p]:text-sm">
                <p className="text-sm text-primary font-bold">
                  Shipping Address
                </p>
                <p>{`${shippingAddress.address} ${shippingAddress.city} ${shippingAddress.state}`}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-primary font-bold">Items</p>
              <div>
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between [&>p]:text-sm"
                  >
                    <p>
                      {truncateTitle(item.product.title, 20)} x {item.quantity}
                    </p>
                    <p className="text-primary font-medium">${item.subTotal}</p>
                  </div>
                ))}
              </div>
            </div>
            <HLineBreaker />
            <div>
              <p className="text-sm text-primary font-bold">Change Status</p>
              <div className="space-x-2 pb-2 pt-3">
                {orderStatus.map((status) => (
                  <Button
                    className="px-3 h-7"
                    variant={"outline"}
                    onClick={() =>
                      handleUpdateStatus(
                        orderId,
                        status.toUpperCase() as ORDER_STATUS,
                      )
                    }
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </td>
      </tr>
    )
  );
};
export default ExpandOrderDetails;
