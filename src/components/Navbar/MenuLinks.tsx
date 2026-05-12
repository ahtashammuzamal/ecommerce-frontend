import { getCategoriesApi } from "@/api/categories.api";
import { queryKeys } from "@/constant/query-keys";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import StateHandler from "../common/StateHandler";
import type { Category } from "@/types";
import { Spinner } from "../ui/spinner";

type MenuLinksProps = {
  className: string;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuLinks = ({ className, setIsActive }: MenuLinksProps) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [queryKeys.CATEGORIES],
    queryFn: () => getCategoriesApi().then((res) => res.data),
  });

  useEffect(() => {
    if (isError) {
      toast.error("Error loading categories");
    }
  }, [isError]);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("categories");

  const location = useLocation();

  return (
    <div className={`flex gap-8 text-sm font-medium items-center ${className}`}>
      <NavLink
        to={"/products"}
        className={
          !activeCategory && location.pathname === "/products"
            ? "text-primary font-semibold underline underline-offset-4"
            : ""
        }
        onClick={() => {
          setIsActive?.(false);
          setSearchParams({ categories: "" });
        }}
      >
        Shop All
      </NavLink>
      <StateHandler
        isLoading={isPending}
        isError={isError}
        isEmpty={!data?.categories.length}
        loadingFallback={<Spinner />}
      >
        {data?.categories.map((category: Category) => (
          <NavLink
            key={category.id}
            to={`/products?categories=${category.slug}`}
            className={
              activeCategory === category.slug
                ? "text-primary font-semibold underline underline-offset-4"
                : ""
            }
            onClick={() => setIsActive?.(false)}
          >
            {category.name}
          </NavLink>
        ))}
      </StateHandler>
    </div>
  );
};
export default MenuLinks;
