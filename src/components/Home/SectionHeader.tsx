import { ArrowRight } from "lucide-react";
import IconButton from "../common/IconButton";

type SectionHeaderProps = {
  title: string;
  description: string;
  to: string;
  buttonText: string;
};

const SectionHeader = ({
  title,
  description,
  to,
  buttonText,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <IconButton variant="link" className={"hidden md:flex"} to={to}>
        {buttonText}
        <ArrowRight />
      </IconButton>
    </div>
  );
};
export default SectionHeader;
