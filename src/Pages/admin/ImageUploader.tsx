import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";

const ImageUploader = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<File[]>(value || []);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    const updated = [...files, ...images].slice(0, 5);
    setImages(updated);
    onChange(updated);
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    field.onChange(updated);
  };

  return (
    <div>
      <FormLabel>Product Images</FormLabel>
      <div
        onClick={handleUploadClick}
        className="w-full h-20 border-2 border-dashed border-primary/20 rounded-sm my-4 flex flex-col items-center justify-center space-y-4 cursor-pointer"
      >
        <Upload className="w-5 h-5" />
        <p className="text-sm">Click to upload images</p>
      </div>
      <Input
        type="file"
        ref={inputRef}
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFilesChange}
      />
      <div className="grid grid-cols-3 gap-2">
        {images.map((file, index) => (
          <div className="relative" key={index}>
            <img
              src={URL.createObjectURL(file)}
              className="h-14 w-full rounded-xl"
            />
            <div
              className="flex items-center justify-center p-1 rounded-full bg-red-500 text-white absolute top-2 right-2"
              onClick={() => handleRemoveImage(index)}
            >
              <X className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ImageUploader;
