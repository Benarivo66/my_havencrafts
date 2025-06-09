import { fetchProductById } from '@/app/lib/data';
import ReviewForm from '@/app/ui/review-form';

interface ReviewPageProps {
  params:Promise<{ id: string }>; 
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const product = await fetchProductById((await params).id) as {
  id: string;
  name: string;
  description?: string;
  sellerId?: string;
  sellerid?: string;
};;
  if (product && 'sellerid' in product && !('sellerId' in product)) {
  product.sellerId = product.sellerid;
}
  console.log({product});

  if (!product) {
    return <p>Product not found.</p>;
  }
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Review: {product.name}</h1>
      <ReviewForm sellerId={product.sellerId} productId={product.id} />
    </div>
  );
}
