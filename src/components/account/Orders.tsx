import type { Order } from "@/types";
import OrderCard from "./OrderCard";
import { useEffect, useState } from "react";
import { getUserOrdersApi } from "@/api/orders.api";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const orders = await getUserOrdersApi();
        return setOrders(orders.data.orders);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };
    fetchUserOrders();
  }, []);

  return (
    <div className="mb-8">
      <div className="mb-6">
        <p className="text-primary font-semibold">Order History</p>
        <p className="text-[16px]">View and track all your orders</p>
      </div>
      <div className="space-y-4">
        {orders?.map((order) => (
          <OrderCard
            key={order.id}
            createdAt={order.createdAt}
            orderItems={order.orderItems}
            status={order.status}
            total={order.total}
          />
        ))}
      </div>
    </div>
  );
};
export default Orders;
