import { Link } from "react-router-dom";

type CategoryCardProps = {
  name: string;
  imageURL: string;
  totalProducts: number;
};

const CategoryCard = ({ name, imageURL, totalProducts }: CategoryCardProps) => {
  return (
    <Link to={"/products"}>
      <div className="group overflow-hidden w-full h-80 md:h-110 sm:h-96 relative rounded-md flex items-end pb-8 pl-8">
        <div
          className="bg-img-styling"
          style={{ backgroundImage: `url(${imageURL})` }}
        />
        <div className="absolute inset-0 h-full w-full bg-black/30" />
        <div className="space-y-1 text-primary-foreground relative z-10">
          <h4 className="text-xl font-semibold">{name}</h4>
          <p className="text-sm text-secondary">{totalProducts} products</p>
        </div>
      </div>
    </Link>
  );
};
export default CategoryCard;
