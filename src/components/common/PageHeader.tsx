const PageHeader = ({ title, description }) => {
  return (
    <div className="py-16">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
export default PageHeader;
