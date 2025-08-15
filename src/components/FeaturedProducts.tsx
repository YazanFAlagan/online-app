'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';

export default function FeaturedProducts() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickView = (product: Product) => {
    // TODO: Implement quick view modal
    console.log('Quick view:', product);
  };

  if (loading) {
    return (
      <section className={`py-20 transition-all duration-300 ${
        theme === 'light' ? 'bg-gradient-to-b from-blue-50 to-white' :
        theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' :
        theme === 'luxury' ? 'bg-gradient-to-b from-black to-gray-900' :
        theme === 'nature' ? 'bg-gradient-to-b from-emerald-900 to-emerald-800' :
        'bg-gradient-to-b from-blue-900 to-blue-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              {t('products.featured')}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-1 bg-gold mx-auto"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                                  className="rounded-2xl h-96 animate-pulse transition-colors duration-300" style={{ backgroundColor: `var(--bg-tertiary)` }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-20 transition-all duration-300 ${
        theme === 'light' ? 'bg-gradient-to-b from-blue-50 to-white' :
        theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' :
        theme === 'luxury' ? 'bg-gradient-to-b from-black to-gray-900' :
        theme === 'nature' ? 'bg-gradient-to-b from-emerald-900 to-emerald-800' :
        'bg-gradient-to-b from-blue-900 to-blue-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl transition-colors duration-300" style={{ color: '#f87171' }}>{error}</div>
                      <button
              onClick={fetchProducts}
              className="mt-4 px-6 py-3 rounded-lg transition-colors" style={{
                backgroundColor: `var(--accent)`,
                color: theme === 'light' || theme === 'nature' ? 'white' : 'black'
              }} onMouseEnter={(e) => {
                if (theme === 'light' || theme === 'nature') {
                  e.currentTarget.style.backgroundColor = theme === 'light' ? '#1d4ed8' : '#16a34a';
                } else {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? '#ca8a04' : theme === 'luxury' ? '#f4e4bc' : '#0891b2';
                }
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `var(--accent)`;
              }}
            >
              Try Again
            </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 transition-all duration-300 ${
      theme === 'light' ? 'bg-gradient-to-b from-blue-50 to-white' :
      theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' :
      theme === 'luxury' ? 'bg-gradient-to-b from-black to-gray-900' :
      theme === 'nature' ? 'bg-gradient-to-b from-emerald-900 to-emerald-800' :
      'bg-gradient-to-b from-blue-900 to-blue-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
                      <h2 className="text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300" style={{ color: `var(--text-primary)` }}>
              {t('products.featured')}
            </h2>
                      <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-24 h-1 mx-auto transition-colors duration-300" style={{ backgroundColor: `var(--accent)` }}
            />
                      <p className="text-lg mt-6 max-w-2xl mx-auto transition-colors duration-300" style={{ color: `var(--text-secondary)` }}>
              Discover our premium collection of natural body splashes, crafted with the finest ingredients
            </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                onQuickView={handleQuickView}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {products.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300" style={{
                borderColor: `var(--accent)`,
                color: `var(--accent)`
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `var(--accent)`;
                e.currentTarget.style.color = theme === 'light' || theme === 'nature' ? 'white' : 'black';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = `var(--accent)`;
              }}
            >
              {t('products.viewAll')}
            </motion.button>
          </motion.div>
        )}

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-xl mb-4 transition-colors duration-300" style={{ color: `var(--text-secondary)` }}>No products available</div>
            <p className="transition-colors duration-300" style={{ color: `var(--text-secondary)` }}>Check back soon for our latest collection</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
