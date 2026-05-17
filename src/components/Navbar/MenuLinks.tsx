import React from "react";
import { NavLink, useLocation, useSearchParams } from "react-router-dom";
import StateHandler from "../common/StateHandler";
import type { Category } from "@/types";
import { Spinner } from "../ui/spinner";
import useCategories from "@/hooks/tanstack/categories/useCategories";

type MenuLinksProps = {
  className: string;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuLinks = ({ className, setIsActive }: MenuLinksProps) => {
  const { data, isPending, isError } = useCategories();

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
        errorFallback={
          <p className="text-destructive text-sm">Failed to load categories</p>
        }
        emptyFallback={<p className="text-sm">No categories found</p>}
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
