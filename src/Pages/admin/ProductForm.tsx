import { getCategoriesApi } from "@/api/categories.api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import type { Category, Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ImageUploader from "./ImageUploader";
import useUpdateProduct from "@/hooks/products/useUpdateProduct";

const ProductForm = ({
  isOpen,
  setIsOpen,
  product,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product | null;
}) => {
  const formType = product ? "update" : "create";

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

  const { mutate: createMutate, isPending: createIsPending } =
    useCreateProduct();
  const { mutate: updateMutate, isPending: updateIsPending } =
    useUpdateProduct();

  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await getCategoriesApi();
      setCategories(data.categories);
    };
    getCategories();
  }, []);

  useEffect(() => {
    if (product) {
      form.reset({
        title: product.title,
        description: product.description,
        images: product.images,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
      });
    }
  }, [product, form]);

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("stock", data.stock);
    formData.append("categoryId", data.categoryId);

    if (formType === "create") {
      data.images.forEach((file: File) => {
        formData.append("images", file);
      });

      try {
        createMutate(formData, {
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
    } else {
      const newImages: File[] = [];
      const existingImageUrls: string[] = [];

      data.images.forEach((file: File | string) => {
        if (typeof file === "string") {
          existingImageUrls.push(file);
        } else {
          newImages.push(file);
        }
      });

      if (existingImageUrls.length > 0) {
        formData.append("existingImages", JSON.stringify(existingImageUrls));
      }

      newImages.forEach((file) => {
        formData.append("images", file);
      });

      if (!product?.id) {
        toast.error("Product ID is missing");
        return;
      }


      try {
        updateMutate(
          { id: product.id, data: formData },
          {
            onSuccess: () => {
              form.reset();
              setIsOpen(false);
              toast.success("Product successfully updated");
            },
            onError: (error: any) => {
              console.error(error);
              toast.error(
                error?.response?.data?.message || "Error updating product",
              );
            },
          },
        );
      } catch (error) {
        console.error(error);
        toast.error("Error updating product");
      }
    }
  };

  return (
    isOpen && (
      <div className="absolute top-0 left-0 h-screen w-full bg-primary/50 z-10 flex items-center justify-center">
        <div className="bg-primary-foreground w-1/4 p-4 rounded-sm space-y-6">
          <div className="flex items-center justify-between border-b border-primary/10 pb-6">
            <h5>{formType === "create" ? "Add Product" : "Edit Product"}</h5>
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
                    <FormMessage />
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
                    <FormMessage />
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
                    message={form.formState.errors.images?.message}
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
                      <FormMessage />
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
                      <FormMessage />
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
                      value={field.value?.toString() || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              product?.category?.name || `Select category`
                            }
                          />
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
                    <FormMessage />
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
                <Button className="flex-1" type="submit" >
                  {createIsPending
                    ? "Creating..."
                    : updateIsPending
                      ? "Updating..."
                      : formType === "create"
                        ? "Create"
                        : "Update"}
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
