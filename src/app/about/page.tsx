'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf, Award, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Leaf,
      title: 'Natural Ingredients',
      description: 'Crafted with the finest natural ingredients sourced from around the world'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'Every product meets our strict quality standards for luxury and excellence'
    },
    {
      icon: Heart,
      title: 'Crafted with Love',
      description: 'Each bottle is carefully crafted with attention to detail and passion'
    },
    {
      icon: Sparkles,
      title: 'Luxury Experience',
      description: 'Transform your daily routine into a luxurious self-care ritual'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              {t('about.title')}
            </h1>
            <div className="w-24 h-1 bg-gold mx-auto mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('about.description')}
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                Our Story
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Zayana was born from a passion for creating luxurious, natural body care products that elevate your daily routine. 
                We believe that self-care should be an indulgent experience, not just a necessity.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our journey began with a simple idea: to combine the healing properties of natural ingredients with the sophistication 
                of luxury design. Every product in our collection is carefully formulated to provide both nourishment and indulgence.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, Zayana stands as a symbol of premium natural care, offering products that transform ordinary moments into 
                extraordinary experiences of luxury and wellness.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-gold/20 to-transparent rounded-3xl p-8 border border-gold/30">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-16 h-16 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    To create the most luxurious natural body care products that make every day feel special. 
                    We're committed to sustainability, quality, and the art of luxury living.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-gray-900/50 rounded-3xl p-12 border border-gray-800"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
              <div className="w-24 h-1 bg-gold mx-auto" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">Sustainability</h3>
                <p className="text-gray-400">
                  We're committed to eco-friendly practices and sustainable sourcing of ingredients
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">Quality</h3>
                <p className="text-gray-400">
                  Every product undergoes rigorous testing to ensure the highest quality standards
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-3">Luxury</h3>
                <p className="text-gray-400">
                  We believe everyone deserves to experience luxury in their daily self-care routine
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
