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
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-neutral-950">
        {formatPrice(price)}
      </span>

      {hasDiscount ? (
        <span className="text-sm text-neutral-400 line-through">
          {formatPrice(oldPrice)}
        </span>
      ) : null}
    </div>
  );
};

export default Price;