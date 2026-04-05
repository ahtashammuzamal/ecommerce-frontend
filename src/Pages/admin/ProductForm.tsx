import { getCategoriesApi } from "@/api/categories.api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useCreateProduct from "@/hooks/products/useCreateProduct";
import { productSchema } from "@/schemas/productSchema";
import type { Category } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";

const ProductForm = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
      price: 0,
      stock: 0,
      categoryId: undefined,
    },
  });

  const { mutate, isPending } = useCreateProduct();

  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await getCategoriesApi();
      setCategories(data.categories);
    };
    getCategories();
  }, []);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("categoryId", data.categoryId);

    data.images.forEach((file: File) => {
      formData.append("images", file);
    });

    try {
      mutate(formData, {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
          toast.success("Product successfully created");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Error creating product");
    }
  };

  return (
    isOpen && (
      <div className="absolute top-0 left-0 h-screen w-full bg-primary/50 z-10 flex items-center justify-center">
        <div className="bg-primary-foreground w-1/4 p-4 rounded-sm space-y-6">
          <div className="flex items-center justify-between border-b border-primary/10 pb-6">
            <h5>Add Product</h5>
            <X onClick={() => setIsOpen(false)} className="cursor-pointer" />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 text-primary"
            >
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="resize-none overflow-y-auto h-20 border border-primary/10"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="images"
                control={form.control}
                render={({ field }) => (
                  <ImageUploader
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
              <div className="flex gap-4">
                <FormField
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="stock"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories && categories?.length > 0 ? (
                          categories?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="none">
                            No categories found
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <div className="flex gap-4">
                <Button
                  variant={"outline"}
                  className="flex-1"
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    form.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button className="flex-1" type="submit">
                  {isPending ? "Creating..." : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    )
  );
};
export default ProductForm;
