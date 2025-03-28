import Link from 'next/link';
import LoginButton from './auth/LoginButton';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-indigo-600">share-n-rent</span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link href="/browse" className="border-transparent text-gray-700 hover:text-indigo-600 hover:border-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium transition-colors">
                Browse
              </Link>
              <Link href="/how-it-works" className="border-transparent text-gray-700 hover:text-indigo-600 hover:border-indigo-600 inline-flex items-center px-1 pt-1 border-b-2 text-base font-medium transition-colors">
                How It Works
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <Link href="/create-listing" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-base font-medium transition-colors duration-200">
                Create Listing
              </Link>
              <LoginButton />
            </div>
            <div className="sm:hidden flex items-center">
              <button className="text-gray-500 hover:text-gray-700 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 