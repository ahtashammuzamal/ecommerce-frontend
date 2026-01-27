import { useForm } from "react-hook-form";
import Logo from "../common/Logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/schemas/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type AuthFormProps = {
  authType: "login" | "register";
};

type onSubmitProps = {
  name?: string;
  email: string;
  password: string;
};

const AuthForm = ({ authType }: AuthFormProps) => {
  const form = useForm({
    resolver: zodResolver(
      authType === "register" ? registerSchema : loginSchema,
    ),
    defaultValues: {
      ...(authType === "register" && { name: "" }),
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: onSubmitProps) => {
    console.log(data);
  };

  return (
    <div className="space-y-8 lg:min-w-125 md:min-w-3/4 min-w-full">
      <Logo />
      <div className="space-y-3">
        <h3>
          {authType === "register" ? "Create an account" : "Welcome Back"}
        </h3>
        <p className="text-[16px]">
          {authType === "register"
            ? "Join us and discover curated home goods"
            : "Sign in to your account to continue shopping"}
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {authType === "register" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name:</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              className="text-center w-full"
            >
              {form.formState.isSubmitting ? "Submitting" : "Submit"}
            </Button>
            <div className="flex items-center justify-center [&>p]:text-sm gap-2">
              <p>
                {authType === "login"
                  ? "Donot have an account?"
                  : "Already have an account?"}
              </p>
              <Link
                to={authType === "login" ? "/auth/register" : "/auth/login"}
                className="text-sm text-primary hover:underline font-medium"
              >
                {authType === "login" ? "Register" : "Login"}
              </Link>
              <Button asChild variant={"link"}></Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default AuthForm;
