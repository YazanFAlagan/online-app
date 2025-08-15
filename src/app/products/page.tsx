'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'newest'>('newest');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, sortBy]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product => {
      const searchLower = searchTerm.toLowerCase();
      return (
        product.name_en.toLowerCase().includes(searchLower) ||
        product.name_ar.toLowerCase().includes(searchLower) ||
        product.description_en.toLowerCase().includes(searchLower) ||
        product.description_ar.toLowerCase().includes(searchLower)
      );
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name_en.localeCompare(b.name_en);
        case 'price':
          return a.price - b.price;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleQuickView = (product: Product) => {
    // TODO: Implement quick view modal
    console.log('Quick view:', product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800/50 rounded-2xl h-96 animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="text-red-400 text-xl mb-4">{error}</div>
            <button
              onClick={fetchProducts}
              className="bg-gold text-black px-6 py-3 rounded-lg hover:bg-gold-light transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">Our Products</h1>
            <div className="w-24 h-1 bg-gold mb-6" />
            <p className="text-xl text-gray-400 max-w-3xl">
              Discover our premium collection of natural body splashes, crafted with the finest ingredients
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div className="flex items-center space-x-4">
                  <label className="text-gray-300 text-sm font-medium">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'newest')}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold transition-colors duration-300"
                  >
                    <option value="newest">Newest</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-gold text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-gold text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <p className="text-gray-400">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`grid gap-8 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onQuickView={handleQuickView}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center py-20"
            >
              <div className="text-gray-400 text-xl mb-4">No products found</div>
              <p className="text-gray-500 mb-8">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSortBy('newest');
                }}
                className="bg-gold text-black px-6 py-3 rounded-lg hover:bg-gold-light transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
