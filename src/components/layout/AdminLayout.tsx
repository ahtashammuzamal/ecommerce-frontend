import { Outlet } from "react-router-dom";
import { Sidebar } from "../admin/Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

export const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex font-inter">
      <Sidebar isOpen={isOpen} handleToggle={handleToggle} />
      <div className="md:p-8 p-4 flex-1 w-full space-y-4">
        <Menu onClick={handleToggle} className="md:hidden"/>
        <Outlet />
      </div>
    </div>
  );
};
