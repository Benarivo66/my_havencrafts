export default function Loading() {
  return (
    <div className="p-4">
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-tertiary2 shadow-md rounded-2xl p-4 flex flex-col animate-pulse"
          >
            <div className="w-full h-48 bg-gray-300 rounded-lg mb-4" />
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-full mb-1" />
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1" />
            <div className="h-6 bg-gray-400 rounded w-1/3 mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
