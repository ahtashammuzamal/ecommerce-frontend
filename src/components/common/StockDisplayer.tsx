const StockDisplayer = ({ stock }: { stock: number }) => {
  return (
    <span className="flex items-center space-x-2">
      <div
        className={`h-[9px] w-[9px] rounded-full shrink-0 ${stock > 0 ? "bg-green-500" : "bg-red-500"}`}
      />
      <p className="text-primary text-sm">
        {stock > 0 ? "In Stock" : "Out Of Stock"}
      </p>
    </span>
  );
};
export default StockDisplayer;
