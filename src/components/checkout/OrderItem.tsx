const OrderItem = ({ imageURL, title, category, subtotal }) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-4">
        <img src={imageURL} alt={title} className="block rounded-xl w-16" />
        <div>
          <p className="text-primary font-medium text-[16px] ">{title}</p>
          <p className="text-sm">{category}</p>
        </div>
      </div>
      <p className="text-primary font-medium text-[16px]">${subtotal}</p>
    </div>
  );
};
export default OrderItem;
