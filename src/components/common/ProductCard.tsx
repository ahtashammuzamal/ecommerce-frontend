import { DollarSign } from "lucide-react";
import CartButton from "./CartButton";
import { Link } from "react-router-dom";
import StockDisplay from "./StockDisplayer";

type ProductCardProps = {
  id: number;
  imageURL: string;
  title: string;
  categoryName?: string;
  price: number;
  stock: number;
};

const ProductCard = ({
  id,
  imageURL,
  title,
  categoryName,
  price,
  stock,
}: ProductCardProps) => {
  return (
    <Link to={`/products/${id}`} className="space-y-4">
      <div className="group h-90 rounded-xl overflow-hidden relative flex items-end p-4">
        <div
          className={`bg-img-styling`}
          style={{ backgroundImage: `url('${imageURL}')` }}
        />
        <CartButton
          productId={id}
          quantity={1}
          className={`relative w-full hidden group-hover:flex theme-dark-bg ${stock > 0 ? "" : "group-hover:hidden"}`}
        />
      </div>

      <div className="space-y-2 [&>p]:text-sm">
        <StockDisplay stock={stock} />
        <p className="text-primary font-semibold">{title}</p>
        <p>{categoryName}</p>
        <div className="flex items-center">
          <DollarSign size={18} className="text-primary" />{" "}
          <p className="text-primary text-sm font-semibold">{price}</p>
        </div>
      </div>
    </Link>
  );
};
export default ProductCard;
