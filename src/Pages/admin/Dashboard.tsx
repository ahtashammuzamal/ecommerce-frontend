import { getAllOrders } from "@/api/orders.api";
import { getAllProductsApi } from "@/api/products.api";
import PageHeader from "@/components/admin/PageHeader";
import { queryKeys } from "@/constant/query-keys";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle,
  DollarSign,
  Loader2,
  Package,
  ShoppingCart,
} from "lucide-react";

const Dashboard = () => {
  const { data: ordersData, isPending: isLoadingOrders } = useQuery({
    queryKey: [queryKeys.ORDERS],
    queryFn: () => getAllOrders().then((res) => res.data),
  });

  const { data: productsData, isPending: isLoadingProducts } = useQuery({
    queryKey: [queryKeys.PRODUCTS],
    queryFn: () => getAllProductsApi({ limit: 1 }).then((res) => res.data),
  });

  const totalRevenue =
    ordersData?.orders
      .filter((order) => order.status !== "CANCELLED")
      .reduce((acc, order) => acc + order.total, 0) || 0;

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      isLoading: isLoadingOrders,
    },
    {
      label: "Total Orders",
      value: ordersData?.totalOrders || 0,
      icon: ShoppingCart,
      isLoading: isLoadingOrders,
    },
    {
      label: "Total Products",
      value: productsData?.meta.total || 0,
      icon: Package,
      isLoading: isLoadingProducts,
    },
    {
      label: "Delivered Orders",
      value: ordersData?.DELIVERED || 0,
      icon: CheckCircle,
      isLoading: isLoadingOrders,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's your store overview."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-primary-foreground p-6 rounded-sm border border-primary/10 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground/70 uppercase tracking-wider">
                {stat.label}
              </p>
              <stat.icon className="w-5 h-5 text-primary/40" />
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold tracking-tight text-primary">
                {stat.isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-primary/20" />
                ) : (
                  stat.value
                )}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
