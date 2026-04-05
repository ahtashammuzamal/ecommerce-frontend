type PageHeaderProps = {
  title: string;
  description?: string;
};

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="space-y-4">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
export default PageHeader;
