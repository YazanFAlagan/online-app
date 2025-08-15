'use client'

import { TruckIcon, ShieldCheckIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline'

const features = [
  {
    icon: TruckIcon,
    title: "Fast Shipping",
    description: "Quick delivery worldwide. Get your merch in 3-5 business days."
  },
  {
    icon: ShieldCheckIcon,
    title: "Quality Guarantee",
    description: "30-day money-back guarantee. We stand behind every product."
  },
  {
    icon: StarIcon,
    title: "Limited Editions",
    description: "Exclusive merch designs that you won't find anywhere else."
  },
  {
    icon: ClockIcon,
    title: "24/7 Support",
    description: "Our team is always here to help with any questions."
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Why Choose TALISA KIDD?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Authentic merch from your favorite artist. Quality you can trust.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                {/* Icon */}
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-800 transition-colors">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-black mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
