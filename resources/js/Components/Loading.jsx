export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="ml-2 text-blue-500">Loading...</p>
        </div>
      ); 
}