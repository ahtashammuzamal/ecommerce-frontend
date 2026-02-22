import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const EmptyCart = () => {
  return (
    <div className="flex items-center justify-center py-4 mb-32 flex-col gap-4 max-w-1/3 m-auto text-center">
      <p className="text-xl text-primary font-semibold">Your cart is empty</p>
      <p className="text-[16px]">
        Looks like you haven't added anything to your cart yet. Explore our
        collection and find something you love.
      </p>
      <Button asChild>
        <Link to={"/products"}>Start Shopping</Link>
      </Button>
    </div>
  );
};
export default EmptyCart;
