import { Link } from "react-router-dom";

const menuLinks = [
  { name: "Shop All", url: "/products" },
  { name: "Living Room", url: "/products" },
  { name: "Bedroom", url: "/products" },
  { name: "Kitchen", url: "/products" },
  { name: "New Arrivals", url: "/products" },
];

type MenuLinksProps = {
  className: string;
};

const MenuLinks = ({ className }: MenuLinksProps) => {
  return (
    <div className={`flex gap-8 text-sm font-medium ${className}`}>
      {menuLinks.map((link, index) => (
        <Link key={index} to={link.url}>
          {link.name}
        </Link>
      ))}
    </div>
  );
};
export default MenuLinks;
