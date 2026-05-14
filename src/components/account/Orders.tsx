import OrderCard from "./OrderCard";
import { getUserOrdersApi } from "@/api/orders.api";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constant/query-keys";
import StateHandler from "../common/StateHandler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";

const Orders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.ORDERS],
    queryFn: () => getUserOrdersApi().then((res) => res.data),
  });

  const [status, setStatus] = useState("all");

  const filteredOrders =
    status === "all"
      ? data?.orders
      : data?.orders?.filter((order) => order.status === status.toUpperCase());

  return (
    <div className="mb-8">
      <div className="mb-6 flex md:flex-row flex-col gap-4 md:gap-0 items-center justify-between">
        <div>
          <p className="text-primary font-semibold">Order History</p>
          <p className="text-[16px]">View and track all your orders</p>
        </div>
        <div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <StateHandler
        isLoading={isLoading}
        isError={isError}
        isEmpty={!filteredOrders?.length}
        emptyFallback={<p>No {status === "all" ? "" : status} orders found.</p>}
      >
        <div className="space-y-4">
          {filteredOrders?.map((order) => (
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
