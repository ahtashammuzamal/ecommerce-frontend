import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export const MainLayout = () => {
  return (
    <>
      <div className="max-w-380 m-auto px-4">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
