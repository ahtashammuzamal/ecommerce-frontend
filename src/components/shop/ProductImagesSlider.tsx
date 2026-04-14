import { useState } from "react";

type ProductImagesSliderProps = {
  productImages?: string[];
};

const ProductImagesSlider = ({ productImages }: ProductImagesSliderProps) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const mainProductImage = selectedImage ?? productImages?.[0];

  return (
    <div>
      <img
        src={mainProductImage}
        alt="Product image"
        className="lg:w-175 w-full max-w-100 rounded-xl"
      />
      <div className="flex gap-2 mt-4">
        {productImages?.map((img, index) => (
          <div
            key={index}
            className="w-20 h-18 inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 rounded-sm shadow cursor-pointer"
            style={{ backgroundImage: `url(${img})` }}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
};
export default ProductImagesSlider;
