import IconButton from "../common/IconButton";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";

const QuantityVariable = () => {
  return (
    <div className="flex gap-2 items-center">
      <IconButton variant={"outline"}>
        <Plus />
      </IconButton>
      <Input className="max-w-12" value={4} />
      <IconButton variant={"outline"}>
        <Minus />
      </IconButton>
    </div>
  );
};
export default QuantityVariable;
