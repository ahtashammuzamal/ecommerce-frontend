const TestimonailSection = () => {
  return (
    <div className="bg-center bg-no-repeat bg-cover bg-[url('/category.jpg')] h-full flex items-end p-12 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-primary/30" />
      <div className="[&>p]:text-primary-foreground z-1">
        <p className="font-semibold">
          "The quality and attention to detail in every piece is remarkable.
          ATELIER has transformed our home."
        </p>
        <p className="mt-4 font-medium">Sarah Mitchell</p>
        <p className="text-sm">Interior Designer, New York</p>
      </div>
    </div>
  );
};
export default TestimonailSection;
