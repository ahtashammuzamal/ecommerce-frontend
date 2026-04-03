import {
  CheckIcon,
  ClockIcon,
  TruckIcon,
  XIcon,
  CreditCardIcon,
} from "lucide-react";

export const statusConfig = {
  PENDING: {
    label: "Pending",
    className: "bg-yellow-50 text-yellow-600",
    icon: ClockIcon,
  },
  PAID: {
    label: "Paid",
    className: "bg-blue-50 text-blue-600",
    icon: CreditCardIcon,
  },
  SHIPPED: {
    label: "Shipped",
    className: "bg-purple-50 text-purple-600",
    icon: TruckIcon,
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-green-50 text-green-600",
    icon: CheckIcon,
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600",
    icon: XIcon,
  },
};
