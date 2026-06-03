interface PriceProps {
  price: number;
  oldPrice?: number;
  className?: string;
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(price);
};

const Price: React.FC<PriceProps> = ({ price, oldPrice, className = "" }) => {
  const hasDiscount = typeof oldPrice === "number" && oldPrice > price;

  return (
    <div className={`flex flex-wrap items-baseline gap-x-2 gap-y-1 ${className}`}>
      <span className="text-sm font-semibold tracking-tight text-neutral-950 md:text-base">
        {formatPrice(price)}
      </span>

      {hasDiscount ? (
        <span className="text-xs font-medium text-neutral-400 line-through md:text-sm">
          {formatPrice(oldPrice)}
        </span>
      ) : null}
    </div>
  );
};

export default Price;