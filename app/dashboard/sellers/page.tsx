import { fetchSellers } from "@/app/lib/data";

export default async function Page() {
  const sellers = await fetchSellers();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {sellers.map((seller) => { 
        return (
        <div
          key={seller.id}
          className="bg-white shadow-md rounded-2xl p-4 flex flex-col items-center text-center"
        >
          <img
            src={`/users/${seller.name.split(" ")[0].toLowerCase()}.webp`}
            alt={seller.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-semibold">{seller.name}</h2>
          <p className="text-gray-600">{seller.email}</p>
          {seller.bio && (
            <p className="text-sm text-gray-500 mt-2">{seller.bio}</p>
          )}
          {seller.phone && (
            <p className="text-sm text-gray-500 mt-2">{seller.phone}</p>
          )}
        </div>
      )})}
    </div>
  );
}
