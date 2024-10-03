'use client'

import React from 'react'
import HieroCheckoutButton from 'hiero-ui';

const DoryAIFreeTrialPage: React.FC = () => {
  return (
    <div className="h-screen bg-gray-100 text-gray-800 font-sans antialiased flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
            Enhance Your Mind with <span className="text-blue-600">DoryAI</span>
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered cognitive assistance at your fingertips.
          </p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {['Personalized training', 'Real-time assistance', 'Data analytics', 'Device integration'].map((feature, index) => (
              <li key={index} className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg border-2 border-blue-600 shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Start Your Free Trial</h2>
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-bold text-gray-800">1 Month</span>
            <span className="text-xl ml-2 text-gray-600">1 Million Credits</span>
          </div>
          <div className="mb-4">
            <div className="border-2 border-blue-600 rounded-lg p-2">
              <HieroCheckoutButton 
                appName="getdory-ai"
                redirectUrl="https://doryai.com/checkout/complete"
                email="user@example.com" // Optional
              />
            </div>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default DoryAIFreeTrialPage