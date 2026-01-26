import { Outlet } from "react-router-dom";
import TestimonailSection from "../auth/TestimonailSection";

const AuthLayout = () => {
  return (
    <div className="flex h-screen">
      <div className="h-full w-full flex items-center justify-center lg:flex-1 lg:px-0 px-4">
        <Outlet />
      </div>
      <div className="lg:flex-1 lg:block hidden">
        <TestimonailSection />
      </div>
    </div>
  );
};
export default AuthLayout;
