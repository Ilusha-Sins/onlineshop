interface PriceProps {
  price: number;
  oldPrice?: number;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(price);
};

const Price: React.FC<PriceProps> = ({ price, oldPrice }) => {
  const hasDiscount = oldPrice && oldPrice > price;

  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-2">
      <span className="text-sm font-bold text-neutral-950 md:text-lg">
        {formatPrice(price)}
      </span>

      {hasDiscount ? (
        <span className="text-xs text-neutral-400 line-through md:text-sm">
          {formatPrice(oldPrice)}
        </span>
      ) : null}
    </div>
  );
};

export default Price;