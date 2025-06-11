// app/dashboard/sellers/loading.tsx
export default function Loading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-gray-200 rounded-2xl h-60 p-4 flex flex-col items-center text-center"
        >
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
          <div className="h-4 w-2/3 bg-gray-300 mb-2 rounded"></div>
          <div className="h-3 w-1/2 bg-gray-300 mb-2 rounded"></div>
          <div className="h-3 w-3/4 bg-gray-300 mb-4 rounded"></div>
          <div className="h-8 w-1/2 bg-gray-400 rounded"></div>
        </div>
      ))}
    </div>
  );
}
