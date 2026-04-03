import { statusConfig } from "@/lib/status-config";
import type { OrderStatus } from "@/types";

const Status = ({ status }: { status: OrderStatus }) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <div
      className={`flex items-center justify-center gap-2  rounded-2xl px-4 ${config.className}`}
    >
      <Icon size={16} /> {config.label}
    </div>
  );
};
export default Status;
