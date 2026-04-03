type PageHeaderProps = {
  title: string;
  description?: string;
};

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="py-16">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
export default PageHeader;
