type ProductImagesSliderProps = {
  imageURL: string | undefined;
};

const ProductImagesSlider = ({ imageURL }: ProductImagesSliderProps) => {
  return <img src={imageURL} className="lg:w-175 w-full rounded-xl" />;
};
export default ProductImagesSlider;
