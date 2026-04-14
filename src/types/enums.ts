export const ROLE = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
} as const;

export type ROLE = typeof ROLE[keyof typeof ROLE];

export const ORDER_STATUS = {
  PENDING: "PENDING",
  PAID: "PAID",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type ORDER_STATUS = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
