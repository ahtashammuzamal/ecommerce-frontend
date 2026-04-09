import OrdersTable from "@/components/admin/OrdersTable";
import PageHeader from "@/components/admin/PageHeader";

const OrdersManagement = () => {
  return (
    <>
      <PageHeader
        title="Order Management"
        description="Manage customer orders and track shipments"
      />
      <OrdersTable />
    </>
  );
};
export default OrdersManagement;
