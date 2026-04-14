import { Trash2 } from "lucide-react";
import LineSpacer from "../common/LineSpacer";
import { useRemoveFromCart } from "@/hooks/cart/useRemoveFromCart";
import CartQuantityVariable from "./CartQuantityVariable";
import { toast } from "sonner";

type CartItemProps = {
  id: number;
  imageURL: string;
  title: string;
  category?: string;
  price: number;
  quantity: number;
};

const SingleCartItem = ({
  id,
  imageURL,
  title,
  category,
  price,
  quantity,
}: CartItemProps) => {
  const { mutate } = useRemoveFromCart();

  const handleRemoveFromCart = (id: number) => {
    try {
      mutate(id);
    } catch (error) {
      console.error(error);
      toast.error("Error in removing item from cart");
    }
  };

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
            <CartQuantityVariable id={id} quantity={quantity} />
            <Trash2 onClick={() => handleRemoveFromCart(id)} />
          </div>
        </div>
      </div>
      <LineSpacer className={"max-w-none w-full bg-primary/10"} />
    </div>
  );
};
export default SingleCartItem;
