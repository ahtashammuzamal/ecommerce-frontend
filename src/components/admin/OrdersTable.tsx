import { getAllOrders } from "@/api/orders.api";
import { queryKeys } from "@/constant/query-keys";
import { statusConfig } from "@/lib/status-config";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { organizeDate } from "@/lib/utils";
import ExpandOrderDetails from "./ExpandOrderDetails";
import StateHandler from "../common/StateHandler";

const OrdersTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeys.ORDERS],
    queryFn: () => getAllOrders().then((res) => res.data),
  });

  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    data?.orders && (
      <div className="mt-8 w-full">
        <table className="w-full text-left border-primary/10 border rounded-lg">
          <thead className="bg-secondary/30 text-sm text-primary font-medium border border-primary/10">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            <StateHandler
              isLoading={isLoading}
              isEmpty={!data.orders.length}
              isError={isError}
            >
              {data.orders.map((order) => (
                <React.Fragment key={order.id}>
                  <tr className="border-b border-primary/10">
                    <td className="px-6 py-5 font-medium text-sm text-primary">
                      ORD-2024-001
                    </td>
                    <td className="px-6 py-5 font-medium text-sm">{`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}</td>
                    <td className="px-6 py-5 font-medium text-sm">
                      {organizeDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-5 font-medium text-sm">
                      ${order.total}
                    </td>
                    <td className="px-6 py-5 font-medium text-sm">
                      <span
                        className={`${statusConfig[order.status].className} px-2 py-0.5 rounded-2xl`}
                      >
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="flex gap-6 px-6 py-5 font-medium text-sm">
                      <ChevronDown
                        onClick={() =>
                          setExpandedId(
                            expandedId === order.id ? null : order.id,
                          )
                        }
                        className={`${expandedId === order.id ? "rotate-180" : ""}`}
                      />
                    </td>
                  </tr>
                  <ExpandOrderDetails
                    orderId={order.id}
                    expandedId={expandedId}
                    shippingAddress={order.shippingAddress}
                    orderItems={order.orderItems}
                  />
                </React.Fragment>
              ))}
            </StateHandler>
          </tbody>
        </table>
      </div>
    )
  );
};
export default OrdersTable;
