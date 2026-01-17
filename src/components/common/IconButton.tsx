import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { ButtonVariant } from "@/types/ui";

type IconButtonProps = {
  children: ReactNode;
  to?: string;
  variant?: ButtonVariant;
} & ComponentPropsWithoutRef<"button">;

const IconButton = ({
  children,
  to,
  variant = "default",
  ...props
}: IconButtonProps) => {
  if (to) {
    return (
      <Button asChild variant={variant} {...props}>
        <Link to={to}>{children}</Link>
      </Button>
    );
  }

  return (
    <Button variant={variant} {...props}>
      {children}
    </Button>
  );
};
export default IconButton;
