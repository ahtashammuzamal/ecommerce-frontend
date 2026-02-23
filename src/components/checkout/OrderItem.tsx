import { truncateTitle } from "@/lib/utils";

type OrderItemProps = {
  imageURL: string;
  title: string;
  category: string;
  subtotal: number;
};

const OrderItem = ({ imageURL, title, category, subtotal }: OrderItemProps) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-4">
        <img src={imageURL} alt={title} className="block rounded-xl w-16" />
        <div>
          <p className="text-primary font-medium text-[16px] ">
            {truncateTitle(title, 20)}
          </p>
          <p className="text-sm">{category}</p>
        </div>
      </div>
      <p className="text-primary font-medium text-[16px]">${subtotal}</p>
    </div>
  );
};
export default OrderItem;
