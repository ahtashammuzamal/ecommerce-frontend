import { Link } from "react-router-dom";
import CopyRight from "./CopyRight";
import LineSpacer from "../common/LineSpacer";

const footerLinks = [
  {
    title: "Shop",
    items: ["All Products", "New Arrivals", "Best Sellers", "Sale"],
  },
  {
    title: "Support",
    items: ["Contact Us", "FAQs", "Shipping & Returns", "Product Care"],
  },
  {
    title: "Company",
    items: ["Our Story", "Sustainability", "Careers", "Press"],
  },
];

const Footer = () => {
  return (
    <div className="py-16 theme-dark-bg">
      <div className="max-w-380 m-auto px-4 flex flex-col md:flex-row gap-8">
        <div className="space-y-4 md:max-w-1/4 md:text-left text-center">
          <Link
            to={"/"}
            className="font-playfair text-2xl font-bold text-primary-foreground block "
          >
            ATELIER
          </Link>
          <p className="text-sm">
            Curating exceptional home goods and lifestyle products since 2020.
            Every piece tells a story.
          </p>
        </div>
        <div className="w-full grid sm:grid-cols-3 grid-cols-1 sm:text-left text-center gap-8 justify-between text-sm font-medium">
          {footerLinks.map((link, index) => (
            <div key={index} className="space-y-4">
              <p className="uppercase font-semibold text-sm text-primary-foreground">
                {link.title}
              </p>
              {link.items.map((item, index) => (
                <Link key={index} to={`/${item}`} className="block">
                  {item}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <LineSpacer />
      <CopyRight />
    </div>
  );
};
export default Footer;
