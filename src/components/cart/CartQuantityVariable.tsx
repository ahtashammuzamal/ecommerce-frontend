import IconButton from "../common/IconButton";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";

type CartQuantityVariableProps = {
  id: number;
  quantity: number;
};

const CartQuantityVariable = ({ id, quantity }: CartQuantityVariableProps) => {
  const { mutate } = useUpdateCart();

  return (
    <div className="flex gap-2 items-center">
      <IconButton
        variant={"outline"}
        onClick={() => mutate({ id, action: "increment" })}
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
        onClick={() => mutate({ id, action: "decrement" })}
      >
        <Minus />
      </IconButton>
    </div>
  );
};
export default CartQuantityVariable;
