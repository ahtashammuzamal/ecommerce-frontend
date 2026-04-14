import IconButton from "../common/IconButton";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";
import { toast } from "sonner";

type CartQuantityVariableProps = {
  id: number;
  quantity: number;
};

const CartQuantityVariable = ({ id, quantity }: CartQuantityVariableProps) => {
  const { mutate } = useUpdateCart();

  const handleUpdateCart = (id: number, action: "increment" | "decrement") => {
    try {
      mutate({ id, action });
    } catch (error) {
      console.error(error);
      toast.error("Error in updating item from cart");
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <IconButton
        variant={"outline"}
        onClick={() => handleUpdateCart(id, "increment")}
      >
        <Plus />
      </IconButton>
      <Input
        className="max-w-12 min-w-12 disabled:text-primary"
        value={quantity}
        disabled
      />
      <IconButton
        variant={"outline"}
        onClick={() => handleUpdateCart(id, "decrement")}
      >
        <Minus />
      </IconButton>
    </div>
  );
};
export default CartQuantityVariable;
