import React from 'react';
import HowItWorks from '@/components/HowItWorks';

export default function HowItWorksPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">How share-n-rent Works</h1>
        <HowItWorks />
        
        <div className="mt-8 max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">How do I list an item for rent?</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Simply click on the "Create Listing" button in the navigation bar and follow the prompts to create your listing.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">How does payment work?</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                All payments are processed securely through our platform. We hold the payment until the rental period is complete.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">What if an item is damaged?</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Our protection policy covers most damages. Both renters and owners are protected through our comprehensive insurance policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 