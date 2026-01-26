import { Trash2 } from "lucide-react";
import QuantityVariable from "../common/QuantityVariable";
import LineSpacer from "../common/LineSpacer";

type CartItemProps = {
  imageURL: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
};

const CartItem = ({
  imageURL,
  title,
  category,
  price,
  quantity,
}: CartItemProps) => {
  return (
    <div>
      <div className="flex sm:flex-row flex-col gap-4">
        <img src={imageURL} alt="" className="w-24 rounded-sm" />
        <div className="w-full space-y-4">
          <div className="flex justify-between">
            <div className="space-y-2">
              <p className="text-primary">{title}</p>
              <p className="text-sm">{category}</p>
            </div>
            <div className="space-y-2">
              <p className="text-primary">${price * quantity}.00</p>
              <p className="text-[12px]">${price} each</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <QuantityVariable />
            <Trash2 />
          </div>
        </div>
      </div>
      <LineSpacer className={"max-w-none w-full bg-primary/10"} />
    </div>
  );
};
export default CartItem;
