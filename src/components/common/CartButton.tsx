import { Button } from "../ui/button";

type CartButtonProps = {
  className: string;
};

const CartButton = ({ className }: CartButtonProps) => {
  return <Button className={className}>Add to Cart</Button>;
};
export default CartButton;
