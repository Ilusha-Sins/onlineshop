import type { Product } from "@/lib/types/product";
import ProductCard from "@/components/product/ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center">
        <p className="text-neutral-500">Поки немає товарів.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;