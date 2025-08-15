'use client'

import { useState } from 'react'
import { EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      // Here you would typically send the email to your backend
      console.log('Newsletter subscription:', email)
    }
  }

  if (isSubscribed) {
    return (
      <section className="py-24 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-black mb-4">
              Welcome to the TALISA KIDD Family!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for subscribing! You'll be the first to know about new music releases, 
              exclusive merch drops, and upcoming shows.
            </p>
            <button
              onClick={() => setIsSubscribed(false)}
              className="text-black underline hover:text-gray-700 transition-colors"
            >
              Subscribe another email
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl p-12">
          {/* Icon */}
          <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
            <EnvelopeIcon className="w-8 h-8 text-white" />
          </div>
          
          {/* Content */}
          <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Stay Connected
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Subscribe to our newsletter for exclusive merch drops, new music releases, and tour updates. 
            Join thousands of TALISA KIDD fans worldwide!
          </p>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </form>
          
          {/* Benefits */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Exclusive drops</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Tour updates</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>New music first</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
