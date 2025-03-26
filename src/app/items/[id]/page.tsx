import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Mock data for the item detail
const mockItems = {
  '1': {
    id: 1,
    title: 'Professional DSLR Camera',
    description: 'High-quality Canon EOS 5D Mark IV DSLR camera with 24-70mm lens. Perfect for professional photography or special events. Includes carrying case, extra battery, and 64GB memory card.',
    category: 'Photography',
    price: 35,
    period: 'day',
    deposit: 200,
    minRental: 1,
    maxRental: 14,
    location: 'Downtown, New York',
    rating: 4.8,
    reviews: 24,
    owner: {
      id: 101,
      name: 'Sarah Johnson',
      image: '/images/user1.jpg',
      rating: 4.9,
      memberSince: 'March 2022',
      responseRate: '98%',
      verifiedID: true,
    },
    images: [
      { id: 1, src: '/images/camera.jpg', alt: 'DSLR Camera main view' },
      { id: 2, src: '/images/camera-2.jpg', alt: 'DSLR Camera side view' },
      { id: 3, src: '/images/camera-3.jpg', alt: 'DSLR Camera with lens' },
      { id: 4, src: '/images/camera-4.jpg', alt: 'DSLR Camera accessories' },
    ],
    availability: [
      { date: '2023-06-01', status: 'available' },
      { date: '2023-06-02', status: 'available' },
      { date: '2023-06-03', status: 'booked' },
      { date: '2023-06-04', status: 'booked' },
      { date: '2023-06-05', status: 'available' },
    ],
    specifications: [
      { name: 'Brand', value: 'Canon' },
      { name: 'Model', value: 'EOS 5D Mark IV' },
      { name: 'Resolution', value: '30.4MP' },
      { name: 'Year', value: '2020' },
      { name: 'Condition', value: 'Excellent' },
    ],
    terms: 'Item must be returned in the same condition. Renter is responsible for any damage beyond normal wear and tear. 24-hour cancellation policy applies. ID verification required before pickup.',
  },
  '2': {
    id: 2,
    title: 'Electric Power Drill',
    description: 'DeWalt 20V Max cordless drill/driver kit. Includes two batteries, charger, and carrying case. Perfect for home improvement projects or construction work.',
    category: 'Tools',
    price: 15,
    period: 'day',
    deposit: 50,
    minRental: 1,
    maxRental: 7,
    location: 'Williamsburg, Brooklyn',
    rating: 4.6,
    reviews: 18,
    owner: {
      id: 102,
      name: 'Mike Thompson',
      image: '/images/user2.jpg',
      rating: 4.7,
      memberSince: 'January 2021',
      responseRate: '95%',
      verifiedID: true,
    },
    images: [
      { id: 1, src: '/images/drill.jpg', alt: 'Power drill main view' },
      { id: 2, src: '/images/drill-2.jpg', alt: 'Power drill side view' },
      { id: 3, src: '/images/drill-3.jpg', alt: 'Power drill with case' },
    ],
    availability: [
      { date: '2023-06-01', status: 'available' },
      { date: '2023-06-02', status: 'available' },
      { date: '2023-06-03', status: 'available' },
      { date: '2023-06-04', status: 'available' },
      { date: '2023-06-05', status: 'booked' },
    ],
    specifications: [
      { name: 'Brand', value: 'DeWalt' },
      { name: 'Model', value: '20V Max' },
      { name: 'Power', value: '20V' },
      { name: 'Year', value: '2021' },
      { name: 'Condition', value: 'Good' },
    ],
    terms: 'Return with fully charged batteries. Any damaged bits must be replaced. 12-hour cancellation policy applies.',
  },
};

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch this data from an API
  const item = mockItems[params.id as keyof typeof mockItems] || mockItems['1'];
  
  // In a real app, this would be state managed by useState
  const selectedImage = item.images[0];

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/browse" className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                Browse
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href={`/browse?category=${item.category.toLowerCase()}`} className="ml-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                {item.category}
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-gray-900 dark:text-white font-medium">
                {item.title}
              </span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image gallery */}
          <div className="mb-8 lg:mb-0">
            <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden rounded-lg mb-4 bg-gray-100 dark:bg-gray-800">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                {selectedImage.alt}
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {item.images.map((image) => (
                <button
                  key={image.id}
                  className="relative h-20 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 hover:ring-2 hover:ring-blue-500"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                    {image.alt.split(' ')[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Item info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h1>
            
            <div className="mt-3">
              <h2 className="sr-only">Item information</h2>
              <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
                ${item.price} <span className="text-base font-medium text-gray-500 dark:text-gray-400">/ {item.period}</span>
              </p>
            </div>

            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg 
                      key={rating}
                      className={`h-5 w-5 ${
                        item.rating > rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  {item.rating} out of 5 stars ({item.reviews} reviews)
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700 dark:text-gray-300">
                {item.description}
              </p>
            </div>

            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Rental Details</h3>
              <div className="mt-4 space-y-4">
                <div className="flex justify-between text-base text-gray-700 dark:text-gray-300">
                  <p>Location</p>
                  <p className="font-medium">{item.location}</p>
                </div>
                <div className="flex justify-between text-base text-gray-700 dark:text-gray-300">
                  <p>Minimum rental period</p>
                  <p className="font-medium">{item.minRental} {item.period}{item.minRental > 1 ? 's' : ''}</p>
                </div>
                <div className="flex justify-between text-base text-gray-700 dark:text-gray-300">
                  <p>Maximum rental period</p>
                  <p className="font-medium">{item.maxRental} {item.period}s</p>
                </div>
                <div className="flex justify-between text-base text-gray-700 dark:text-gray-300">
                  <p>Security deposit</p>
                  <p className="font-medium">${item.deposit}</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4">
                    {/* Would use Image component with actual user images */}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">{item.owner.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Member since {item.owner.memberSince} • {item.owner.responseRate} response rate
                    </p>
                    {item.owner.verifiedID && (
                      <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Verified ID
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex">
                  <button className="flex-1 mr-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Message
                  </button>
                  <Link 
                    href={`/items/${item.id}/book`} 
                    className="flex-1 ml-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Item details */}
        <div className="mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-x-8">
          {/* Specifications */}
          <div className="lg:col-span-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Specifications</h2>
              <div className="mt-4 space-y-4">
                {item.specifications.map((spec) => (
                  <div key={spec.name} className="flex justify-between text-sm">
                    <p className="text-gray-500 dark:text-gray-400">{spec.name}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability calendar would go here */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Availability</h2>
              <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-center py-8">
                  Calendar functionality coming soon
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-0 lg:col-span-8">
            {/* Terms */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Terms & Conditions</h2>
              <p className="text-base text-gray-700 dark:text-gray-300">
                {item.terms}
              </p>
            </div>

            {/* Reviews would go here */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Reviews</h2>
              <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-center py-8">
                  Reviews functionality coming soon
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related items */}
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-16">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">More items from this category</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {/* Would map through related items here */}
            <div className="group">
              <div className="aspect-w-1 aspect-h-1 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <div className="h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Related Item Image
                </div>
              </div>
              <h3 className="mt-4 text-base font-medium text-gray-900 dark:text-white">Related Item Title</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Category</p>
              <p className="mt-1 text-lg font-medium text-gray-900 dark:text-white">$XX / period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 