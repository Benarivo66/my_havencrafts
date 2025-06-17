import { fetchSellerWithProducts } from "@/app/lib/data";
import ProductCard from "@/app/ui/ProductCard";
import { fetchReviewsbyProduct } from "@/app/lib/data";

interface SellerPageProps {
  params: Promise<{ id: string }>;
}

export default async function SellerPage({ params }: SellerPageProps) {
  const seller = await fetchSellerWithProducts((await params).id);

  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-2xl p-4 text-center">
        <img
          src={`/users/${seller!.name.split(" ")[0].toLowerCase()}.webp`}
          alt={seller!.name}
          className="w-24 h-24 rounded-full object-cover mb-4 mx-auto"
        />
        <h2 className="text-2xl font-semibold">{seller!.name}</h2>
        <p className="text-gray-600">{seller!.email}</p>
        {seller!.bio && <p className="text-sm text-gray-500 mt-2">{seller!.bio}</p>}
        {seller!.phone && <p className="text-sm text-gray-500 mt-2">{seller!.phone}</p>}
      </div>

      <h3 className="text-xl font-bold mt-8 mb-4">Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {await Promise.all(
    seller!.products.map(async (product) => {
      const reviews = await fetchReviewsbyProduct(product.id);
      const rating = reviews && reviews.length > 0
  ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
  : 0;
  
      return (
        <ProductCard
          key={product.id}
          product={product}
          sellerId={seller!.id}
          rating={rating}
        />
      );
    })
  )}
      </div>
    </div>
  );
}
