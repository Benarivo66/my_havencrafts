import { fetchSellers } from "@/app/lib/data";
import Link from 'next/link';

export default async function Page() {
  const sellers = await fetchSellers();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {sellers.map((seller) => { 
        return (
        <div
          key={seller.id}
          className="bg-tertiary2 shadow-md rounded-2xl p-4 flex flex-col items-center text-center"
        >
          <img
            src={`/users/${seller.name.split(" ")[0].toLowerCase()}.webp`}
            alt={seller.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold">{seller.name}</h2>
          <p className="text-tertiary1">{seller.email}</p>
          {seller.bio && (
            <p className="text-sm text-tertiary1 mt-2">{seller.bio}</p>
          )}
          {seller.phone && (
            <p className="text-sm text-tertiary1 mt-2">{seller.phone}</p>
          )}
          <Link
            href={`/dashboard/sellers/${seller.id}`}
            className="mt-4 inline-block bg-secondary text-white px-4 py-2 rounded hover:bg-tertiary"
          >
            View Products
          </Link>
        </div>
      )})}
    </div>
  );
}
