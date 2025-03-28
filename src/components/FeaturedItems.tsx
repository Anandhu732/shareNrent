import Link from 'next/link';

// Mock data for featured items
const featuredItems = [
  {
    id: 1,
    title: 'Professional DSLR Camera',
    category: 'Photography',
    price: 35,
    period: 'day',
    rating: 4.8,
    reviews: 24,
    image: '/images/camera.jpg',
    fallbackColor: 'bg-blue-100',
  },
  {
    id: 2,
    title: 'Electric Power Drill',
    category: 'Tools',
    price: 15,
    period: 'day',
    rating: 4.6,
    reviews: 18,
    image: '/images/drill.jpg',
    fallbackColor: 'bg-yellow-100',
  },
  {
    id: 3,
    title: 'Mountain Bike',
    category: 'Outdoor',
    price: 25,
    period: 'day',
    rating: 4.9,
    reviews: 32,
    image: '/images/bike.jpg',
    fallbackColor: 'bg-green-100',
  },
  {
    id: 4,
    title: 'Acoustic Guitar',
    category: 'Music',
    price: 20,
    period: 'day',
    rating: 4.7,
    reviews: 15,
    image: '/images/guitar.jpg',
    fallbackColor: 'bg-red-100',
  },
];

const FeaturedItems = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Items</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the most popular items available for rent in your area
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <div key={item.id} className="card hover:shadow-lg">
              <Link href={`/items/${item.id}`}>
                <div className={`h-48 ${item.fallbackColor} rounded-t-lg relative overflow-hidden`}>
                  {/* In a real app, you'd use actual images */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    {item.category} Image
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-medium rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    ${item.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/{item.period}</span>
                  </p>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    </div>
                    <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{item.rating} ({item.reviews} reviews)</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/browse" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
            View All Items
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems; 