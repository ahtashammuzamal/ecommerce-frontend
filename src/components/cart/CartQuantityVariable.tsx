import IconButton from "../common/IconButton";
import { Loader2, Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { useUpdateCart } from "@/hooks/tanstack/cart/useUpdateCart";
import { toast } from "sonner";

type CartQuantityVariableProps = {
  id: number;
  quantity: number;
};

const CartQuantityVariable = ({ id, quantity }: CartQuantityVariableProps) => {
  const { mutate, isPending, variables } = useUpdateCart();

  const handleUpdateCart = (id: number, action: "increment" | "decrement") => {
    try {
      mutate(
        { id, action },
        {
          onError: () => {
            toast.error("Error in updating item from cart");
          },
        },
      );
    } catch (error) {
      console.error(error);
      toast.error("Error in updating item from cart");
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <IconButton
        disabled={isPending}
        variant={"outline"}
        onClick={() => handleUpdateCart(id, "increment")}
      >
        {isPending && variables?.action === "increment" ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Plus />
        )}
      </IconButton>
      <Input
        className="max-w-12 min-w-12 disabled:text-primary"
        value={quantity}
        disabled
      />
      <IconButton
        disabled={isPending}
        variant={"outline"}
        onClick={() => handleUpdateCart(id, "decrement")}
      >
        {isPending && variables?.action === "decrement" ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Minus />
        )}
      </IconButton>
    </div>
  );
};
export default CartQuantityVariable;
