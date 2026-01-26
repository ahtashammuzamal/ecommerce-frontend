import { User } from "lucide-react";
import { Link } from "react-router-dom";

const AccountOptions = () => {
  return (
    <Link to={"/auth/login"}>
      <User size={18} className="theme-dark-text" />
    </Link>
  );
};
export default AccountOptions;
