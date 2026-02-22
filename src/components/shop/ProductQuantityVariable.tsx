import IconButton from "../common/IconButton";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";
import type { Dispatch, SetStateAction } from "react";

type ProductQuantityVariableProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
};

const ProductQuantityVariable = ({
  setQuantity,
  quantity,
}: ProductQuantityVariableProps) => {
  return (
    <div className="flex gap-2 items-center">
      <IconButton variant={"outline"} onClick={() => setQuantity(quantity + 1)}>
        <Plus />
      </IconButton>
      <Input
        className="max-w-12 min-w-12 disabled:text-primary"
        value={quantity}
        disabled
      />
      <IconButton
        variant={"outline"}
        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
      >
        <Minus />
      </IconButton>
    </div>
  );
};
export default ProductQuantityVariable;
