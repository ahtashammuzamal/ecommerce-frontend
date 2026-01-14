import { Link } from "react-router-dom";
import MenuLinks from "../Navbar/MenuLinks";
import AccountOptions from "../Navbar/AccountOptions";
import { UserCart } from "../Navbar/UserCart";
import { useState } from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="flex items-center justify-between py-4 border-[#eae8e1] border-b-2 relative">
      <Menu
        className="block lg:hidden"
        onClick={() => setIsActive(!isActive)}
      />
      {isActive && (
        <div className="absolute top-20 w-full bg-secondary rounded-2xl lg:hidden">
          <MenuLinks className={"flex flex-col items-center py-4"} />
        </div>
      )}
      <Link
        to={"/"}
        className="font-playfair text-xl font-bold theme-dark-text"
      >
        ATELIER
      </Link>
      <MenuLinks className={"hidden lg:flex"} />
      <div className="flex gap-4">
        <AccountOptions />
        <UserCart />
      </div>
    </div>
  );
};
export default Navbar;
