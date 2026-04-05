import { Outlet } from "react-router-dom";
import { Sidebar } from "../admin/Sidebar";

export const AdminLayout = () => {
  return (
    <div className="flex font-inter">
      <Sidebar />
      <div className="p-8 flex-1">
        <Outlet />
      </div>
    </div>
  );
};
