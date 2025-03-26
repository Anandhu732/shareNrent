import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiSearch, FiPlusSquare, FiUser, FiMessageCircle, FiMenu, FiX } from 'react-icons/fi';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Share-n-Rent - Rent What You Need',
  description = 'Share-n-Rent is a platform for renting items from people near you.'
}) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Mock unread message count - in a real app, this would come from an API
  const unreadMessageCount = 2;

  const navItems = [
    { label: 'Home', href: '/', icon: <FiHome className="w-5 h-5" /> },
    { label: 'Explore', href: '/search', icon: <FiSearch className="w-5 h-5" /> },
    { label: 'Create', href: '/create', icon: <FiPlusSquare className="w-5 h-5" /> },
    {
      label: 'Messages',
      href: '/messages',
      icon: <FiMessageCircle className="w-5 h-5" />,
      showBadge: unreadMessageCount > 0,
      badgeCount: unreadMessageCount
    },
    { label: 'Profile', href: '/profile', icon: <FiUser className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(path);
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <span className="text-indigo-600 font-bold text-xl">Share-N-Rent</span>
                </Link>
              </div>

              <div className="hidden md:flex md:items-center md:space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                    } transition-colors relative`}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>

                    {item.showBadge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badgeCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="flex items-center md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-base font-medium ${
                      isActive(item.href)
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                    } transition-colors relative`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>

                    {item.showBadge && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {item.badgeCount}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Main content */}
        <main className="flex-1 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex justify-center md:order-2 space-x-6">
                <Link href="/about" className="text-gray-500 hover:text-gray-600">
                  About
                </Link>
                <Link href="/terms" className="text-gray-500 hover:text-gray-600">
                  Terms
                </Link>
                <Link href="/privacy" className="text-gray-500 hover:text-gray-600">
                  Privacy
                </Link>
                <Link href="/contact" className="text-gray-500 hover:text-gray-600">
                  Contact
                </Link>
              </div>
              <div className="mt-8 md:mt-0 md:order-1">
                <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} Share-N-Rent. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;