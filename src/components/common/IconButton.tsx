import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import type { ReactNode } from "react";
import type { ButtonVariant } from "@/types/ui";

type IconButtonProps = {
  children: ReactNode;
  to: string;
  variant: ButtonVariant;
  className?: string;
};

const IconButton = ({
  children,
  to,
  variant = "default",
  className,
  ...props
}: IconButtonProps) => {
  return (
    <Button asChild variant={variant} className={className} {...props}>
      <Link to={to}>{children}</Link>
    </Button>
  );
};
export default IconButton;
