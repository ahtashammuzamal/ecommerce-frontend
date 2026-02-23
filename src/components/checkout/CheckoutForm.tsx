import { ArrowLeft } from "lucide-react";
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
import type { ShippingAddress } from "@/types";
import { useClearCart } from "@/hooks/cart/useClearCart";
import { useNavigate } from "react-router-dom";

type CheckoutFormProps = {
  className: string;
};

const CheckoutForm = ({ className }: CheckoutFormProps) => {
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

  const { mutate } = useClearCart();

  const navigate = useNavigate();

  const onSubmit = async (data: ShippingAddress) => {
    try {
      await createOrderApi({ shippingAddress: data });
      navigate("/checkout/success");
    } catch (error) {
      console.error(error);
    } finally {
      mutate();
      form.reset();
    }
  };

  return (
    <div className={className}>
      <IconButton variant={"link"} to="/cart">
        <ArrowLeft />
        Back to cart
      </IconButton>
      <h3>Checkout</h3>
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
          <Button
            className="w-full rounded"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Creating Order ..."
              : "Complete Order"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default CheckoutForm;
