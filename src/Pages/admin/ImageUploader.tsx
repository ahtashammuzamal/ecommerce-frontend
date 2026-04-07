import { FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { useRef } from "react";

const ImageUploader = ({
  value,
  onChange,
  message,
}: {
  value: (File | string)[];
  onChange: (files: (File | string)[]) => void;
  message?: string;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    // When adding new files, keep existing images (strings or Files) and add new ones
    const existingImages = value || [];
    const updated = [...existingImages, ...files].slice(0, 5);
    onChange(updated);
    // Clear the input so the same file can be selected again if needed
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    const updated = (value || []).filter((_, i) => i !== index);
    onChange(updated);
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
      <FormMessage>{message || ""}</FormMessage>
      <div className="grid grid-cols-3 gap-2">
        {(value || []).map((file: File | string, index: number) => {
          const imageUrl =
            typeof file === "string" ? file : URL.createObjectURL(file);
          return (
            <div className="relative" key={index}>
              <img
                src={imageUrl}
                className="h-14 w-full rounded-xl object-cover"
              />
              <div
                className="flex items-center justify-center p-1 rounded-full bg-red-500 text-white absolute top-2 right-2 cursor-pointer"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="h-4 w-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ImageUploader;
