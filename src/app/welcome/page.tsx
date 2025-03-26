"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiArrowRight, FiCamera, FiDollarSign, FiMessageCircle, FiShield, FiStar, FiUsers } from 'react-icons/fi';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white z-0"></div>
        
        {/* Animated blobs */}
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
          <div className="flex justify-center mb-8">
            <span className="text-4xl font-bold text-indigo-600">WorkIt</span>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Rent Anything, <span className="text-indigo-600">From Anyone</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              The smart way to access the things you need without the burden of ownership. 
              Share resources, save money, and connect with your community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center h-12 px-6 py-0 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 ease-in-out md:text-lg"
              >
                Get Started
                <FiArrowRight className="ml-2" />
              </Link>
              <Link 
                href="#how-it-works" 
                className="inline-flex items-center justify-center h-12 px-6 py-0 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-300 ease-in-out md:text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
          
          <div className="mt-16 relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-1">
                <img
                  src="https://placehold.co/1200x600/indigo/white?text=Share-N-Rent+App+Interface"
                  alt="Share-N-Rent App Interface"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose Share-N-Rent?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our platform is designed to make renting and lending items simple, secure, and beneficial for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="feature-icon w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                <FiDollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Save Money</h3>
              <p className="text-gray-600">
                Rent items at a fraction of the purchase price. Earn extra income by listing items you rarely use.
              </p>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="feature-icon w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                <FiUsers className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Based</h3>
              <p className="text-gray-600">
                Connect with people in your neighborhood. Build trust through ratings and reviews.
              </p>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="feature-icon w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                <FiShield className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Transactions</h3>
              <p className="text-gray-600">
                Our secure payment system and verification process ensures safe transactions for all parties.
              </p>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="feature-icon w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                <FiCamera className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Wide Selection</h3>
              <p className="text-gray-600">
                From tools to cameras, furniture to party supplies - find almost anything you need on our platform.
              </p>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="feature-icon w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                <FiMessageCircle className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Seamless Communication</h3>
              <p className="text-gray-600">
                Our integrated messaging system makes it easy to coordinate pickups, returns, and ask questions.
              </p>
            </div>
            
            <div className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="feature-icon w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                <FiStar className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Our rating system helps ensure you're getting quality items from trusted lenders in your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Getting started with Share-N-Rent is simple, whether you're lending or borrowing.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-indigo-100"></div>
              </div>
              
              <div className="relative z-10 space-y-16">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:pr-12 text-center md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Create an Account</h3>
                    <p className="text-gray-600">
                      Sign up in seconds with your email or Google account. Complete your profile to start building trust.
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white text-xl font-bold mb-5 md:mb-0 order-1 md:order-2">
                    1
                  </div>
                  <div className="flex-1 md:pl-12 order-3 hidden md:block"></div>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:pr-12 hidden md:block"></div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white text-xl font-bold mb-5 md:mb-0">
                    2
                  </div>
                  <div className="flex-1 md:pl-12 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Browse or List Items</h3>
                    <p className="text-gray-600">
                      Search for items you need or list your own items that others can rent. Add photos, descriptions, and set your price.
                    </p>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:pr-12 text-center md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Request and Confirm</h3>
                    <p className="text-gray-600">
                      When you find what you need, send a rental request. Owners review requests and confirm bookings.
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white text-xl font-bold mb-5 md:mb-0 order-1 md:order-2">
                    3
                  </div>
                  <div className="flex-1 md:pl-12 order-3 hidden md:block"></div>
                </div>
                
                {/* Step 4 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:pr-12 hidden md:block"></div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white text-xl font-bold mb-5 md:mb-0">
                    4
                  </div>
                  <div className="flex-1 md:pl-12 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Meet and Exchange</h3>
                    <p className="text-gray-600">
                      Coordinate pickup and return through our messaging system. Exchange items safely and securely.
                    </p>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="flex-1 md:pr-12 text-center md:text-right order-2 md:order-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Rate and Review</h3>
                    <p className="text-gray-600">
                      After the rental period, rate your experience. Good ratings help build a trusted community.
                    </p>
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white text-xl font-bold mb-5 md:mb-0 order-1 md:order-2">
                    5
                  </div>
                  <div className="flex-1 md:pl-12 order-3 hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600">
              Don't just take our word for it - hear from our community of renters and lenders.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-medium">JD</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">John Davis</h4>
                  <div className="flex text-yellow-400">
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I saved over $500 by renting a professional camera for my daughter's graduation instead of buying one. The process was smooth and the owner was very helpful."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-medium">SM</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Sarah Miller</h4>
                  <div className="flex text-yellow-400">
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I've made over $1,200 in the past six months renting out my power tools that were just collecting dust. Plus, I've met some great people in my neighborhood."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-medium">RJ</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">Robert Johnson</h4>
                  <div className="flex text-yellow-400">
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar className="fill-current" />
                    <FiStar />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Share-N-Rent has changed the way I think about ownership. Why buy when you can rent? It's better for my wallet and better for the environment."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold mb-6">Ready to Start Sharing?</h2>
            <p className="text-xl mb-10 opacity-90">
              Join thousands of users already saving money and building community through Share-N-Rent.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center h-12 px-6 py-0 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 transition-colors duration-300 ease-in-out md:text-lg"
              >
                Sign Up Now
                <FiArrowRight className="ml-2" />
              </Link>
              <Link 
                href="#how-it-works" 
                className="inline-flex items-center justify-center h-12 px-6 py-0 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white/10 transition-colors duration-300 ease-in-out md:text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Share-N-Rent</h3>
              <p className="text-gray-400">
                Connecting communities through collaborative consumption.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">How It Works</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Safety Tips</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Press</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Share-N-Rent. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 