type CategoryCardProps = {
  name: string;
  productsCount: number;
};

const CategoryCard = ({ name, productsCount }: CategoryCardProps) => {
  return (
    <div className="group overflow-hidden w-full h-80 md:h-110 sm:h-96 relative rounded-md flex items-end pb-8 pl-8">
      <div className="bg-img-styling bg-[url('/category.jpg')]" />
      <div className="absolute inset-0 h-full w-full bg-black/30" />
      <div className="space-y-1 text-primary-foreground relative z-10">
        <h4 className="text-xl font-semibold">{name}</h4>
        <p className="text-sm text-secondary">{productsCount} products</p>
      </div>
    </div>
  );
};
export default CategoryCard;
