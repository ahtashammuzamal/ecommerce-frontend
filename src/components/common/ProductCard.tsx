import { DollarSign } from "lucide-react";
import CartButton from "./CartButton";
import { Link } from "react-router-dom";
import { useAddToCart } from "@/hooks/cart/useAddToCart";

type ProductCardProps = {
  id: number;
  imageURL: string;
  title: string;
  category: string;
  price: number;
};

const ProductCard = ({
  id,
  imageURL,
  title,
  category,
  price,
}: ProductCardProps) => {
  const { mutate, isPending } = useAddToCart();

  const handleAddToCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      mutate({ productId: id, quantity: 1 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link to={`/products/${id}`} className="space-y-4">
      <div className="group h-90 rounded-xl overflow-hidden relative flex items-end p-4">
        <div
          className={`bg-img-styling`}
          style={{ backgroundImage: `url('${imageURL}')` }}
        />
        <CartButton
          className={"relative w-full hidden group-hover:flex"}
          onClick={handleAddToCard}
          isPending={isPending}
        />
      </div>
      <div className="space-y-2 [&>p]:text-sm">
        <p className="text-primary font-semibold">{title}</p>
        <p>{category}</p>
        <div className="flex items-center">
          <DollarSign size={18} className="text-primary" />{" "}
          <p className="text-primary text-sm font-semibold">{price}</p>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
