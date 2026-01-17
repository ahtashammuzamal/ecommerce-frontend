type LineSpacerProps = {
  className?: string;
};

const LineSpacer = ({ className }: LineSpacerProps) => {
  return (
    <div
      className={`h-[0.5px] my-8 bg-[#eae8e1]/20 max-w-11/12 mx-auto ${className}`}
    />
  );
};
export default LineSpacer;
