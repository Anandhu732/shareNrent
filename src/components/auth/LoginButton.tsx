"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiLogIn, FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { useState } from "react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  if (isLoading) {
    return (
      <button
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100"
        disabled
      >
        <div className="h-4 w-4 mr-2 rounded-full border-2 border-gray-400 border-t-transparent animate-spin"></div>
        Loading...
      </button>
    );
  }

  if (session?.user) {
    return (
      <div className="relative">
        <button 
          onClick={toggleDropdown}
          className="flex items-center space-x-2 focus:outline-none rounded-md hover:bg-gray-100 p-2 transition-colors"
        >
          {session.user.image ? (
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={session.user.image}
                alt={session.user.name || "User profile"}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <FiUser className="text-indigo-600" />
            </div>
          )}
          <span className="hidden md:inline text-sm font-semibold text-gray-800">
            {session.user.name?.split(" ")[0]}
          </span>
          <FiChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} text-gray-600`} />
        </button>
        
        {isDropdownOpen && (
          <>
            <div 
              className="fixed inset-0 z-0" 
              onClick={closeDropdown}
            ></div>
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <Link
                href="/dashboard"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                onClick={closeDropdown}
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
                onClick={closeDropdown}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  closeDropdown();
                  signOut({ callbackUrl: "/" });
                }}
                className="w-full text-left block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-indigo-600"
              >
                <span className="flex items-center">
                  <FiLogOut className="mr-2" />
                  Sign out
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
    >
      <FiLogIn className="mr-2" />
      Sign in
    </button>
  );
} 