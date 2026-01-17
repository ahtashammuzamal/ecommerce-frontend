import { DollarSign } from "lucide-react";
import CartButton from "./CartButton";

type ProductCardProps = {
  imageURL: string;
  title: string;
  category: string;
  price: number;
};

const ProductCard = ({
  imageURL,
  title,
  category,
  price,
}: ProductCardProps) => {
  return (
    <div className="space-y-4">
      <div className="group h-90 rounded-xl overflow-hidden relative flex items-end p-4">
        <div
          className={`bg-img-styling`}
          style={{ backgroundImage: `url('${imageURL}')` }}
        />
        <CartButton className={"relative w-full hidden group-hover:block"} />
      </div>
      <div className="space-y-2 [&>p]:text-sm">
        <p className="text-primary font-semibold">{title}</p>
        <p>{category}</p>
        <div className="flex items-center">
          <DollarSign size={18} className="text-primary" />{" "}
          <p className="text-primary text-sm font-semibold">{price}</p>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
