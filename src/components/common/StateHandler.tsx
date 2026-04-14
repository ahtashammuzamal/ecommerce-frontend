import type React from "react";
import { Spinner } from "../ui/spinner";

type StateHandlerProps = {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  emptyFallback?: React.ReactNode;
  children: React.ReactNode;
};

const StateHandler = ({
  isLoading,
  isError,
  isEmpty,
  loadingFallback = <Spinner className="size-8"/>,
  errorFallback = <p>Something went wrong.</p>,
  emptyFallback = <p>No data found.</p>,
  children,
}: StateHandlerProps) => {
  if (isLoading) return <>{loadingFallback}</>;
  if (isError) return <p>{errorFallback}</p>;
  if (isEmpty) return <p>{emptyFallback}</p>;

  return <>{children}</>;
};
export default StateHandler;
