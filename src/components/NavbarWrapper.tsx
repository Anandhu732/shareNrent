'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRootPage = pathname === '/';
  const isLoginPage = pathname === '/login';
  const hideNavAndFooter = isRootPage || isLoginPage;

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <main className="min-h-screen">
        {children}
      </main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
} 