import type { Product } from "@/lib/types/product";
import ProductCard from "@/components/product/ProductCard";
import EmptyState from "@/components/ui/EmptyState";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, className = "" }) => {
  if (!products.length) {
    return (
      <EmptyState
        title="Поки немає товарів"
        description="Товари з’являться тут після додавання в каталог."
      />
    );
  }

  return (
    <div
      className={`grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:gap-6 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;