import PageHeader from "@/components/common/PageHeader";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HLineBreaker from "../common/HLineBreaker";
import IconButton from "../common/IconButton";
import { HexagonIcon, LogOut, Settings } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

const AccountLayout = () => {
  const { logout } = useAuthContext();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/products");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <>
      <div className="max-w-380 m-auto px-4">
        <Navbar />
        <PageHeader title="My Account" />

        <div className="flex lg:flex-row flex-col min-h-screen gap-12">
          <div className="lg:w-2/12">
            <div className="flex items-center justify-baseline gap-2 ">
              <span className="bg-accent text-primary p-3 rounded-full">A</span>
              <span>
                <p className="text-sm text-primary font-medium">Ahtasham</p>
                <p className="text-sm">ahtashammuzamal@gmail.com</p>
              </span>
            </div>
            <HLineBreaker />
            <div className="flex flex-col items-baseline">
              <IconButton to="/account/orders" variant={"ghost"}>
                <HexagonIcon />
                Orders
              </IconButton>
              <IconButton to="/account/settings" variant={"ghost"}>
                <Settings />
                Settings
              </IconButton>
            </div>
            <HLineBreaker />
            <IconButton
              to="/account/settings"
              variant={"ghost"}
              onClick={handleLogout}
            >
              <LogOut />
              Logout
            </IconButton>
          </div>
          <div className="lg:w-10/12">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default AccountLayout;
