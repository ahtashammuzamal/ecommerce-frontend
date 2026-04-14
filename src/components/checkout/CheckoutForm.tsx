import { ArrowLeft, CircleDot } from "lucide-react";
import IconButton from "../common/IconButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "@/schemas/checkoutSchema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createOrderApi } from "@/api/orders.api";
import { useClearCart } from "@/hooks/cart/useClearCart";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/hooks/cart/useCart";

type CheckoutFormProps = {
  className: string;
};

const CheckoutForm = ({ className }: CheckoutFormProps) => {
  const { data } = useCart();

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      appartment: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate } = useClearCart();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setIsProcessing(true);

      const { data: res } = await createOrderApi({ shippingAddress: data });
      setTimeout(() => setIsProcessing(false), 1500);
      navigate(`/checkout/success/${res.order.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      mutate();
      form.reset();
    }
  };

  if (data?.totalCartItems === 0) return <Navigate to={"/cart"} />;

  return (
    <div className={className}>
      <IconButton variant={"link"} to="/cart">
        <ArrowLeft />
        Back to cart
      </IconButton>
      <h3 className="mb-4">Checkout</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h4>Shipping Address</h4>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="appartment"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appartment</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-4">
            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="state"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="zipCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <h5>Shipping Method</h5>
            <div className="bg-white p-4 rounded-sm mt-2 flex gap-4 items-center">
              <CircleDot size={15} className="text-primary" />
              <p className="text-sm">
                Cash On Delivery (Other methods coming soon)
              </p>
            </div>
          </div>
          <Button className="w-full rounded" disabled={isProcessing}>
            {isProcessing ? "Processing ..." : "Complete Order"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default CheckoutForm;
