import OrderCard from "./OrderCard";
import { getUserOrdersApi } from "@/api/orders.api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";
import StateHandler from "../common/StateHandler";

const Orders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.ORDERS],
    queryFn: () => getUserOrdersApi().then((res) => res.data),
  });

  return (
    <div className="mb-8">
      <div className="mb-6">
        <p className="text-primary font-semibold">Order History</p>
        <p className="text-[16px]">View and track all your orders</p>
      </div>
      <StateHandler
        isLoading={isLoading}
        isError={isError}
        isEmpty={!data?.orders.length}
        emptyFallback={<p>No orders found.</p>}
      >
        <div className="space-y-4">
          {data?.orders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              createdAt={order.createdAt}
              orderItems={order.orderItems}
              status={order.status}
              total={order.total}
            />
          ))}
        </div>
      </StateHandler>
    </div>
  );
};
export default Orders;
