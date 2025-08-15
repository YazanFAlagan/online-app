'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleQuantityUpdate = async (productId: string, newQuantity: number) => {
    setIsUpdating(productId);
    updateQuantity(productId, newQuantity);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsUpdating(null);
    }, 500);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">{t('cart.title')}</h1>
              <p className="text-xl text-gray-400 mb-8">{t('cart.empty')}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold-light transition-all duration-300"
                >
                  {t('cart.continueShopping')}
                </motion.button>
              </Link>
            </motion.div>
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
            <div className="flex items-center space-x-4 mb-6">
              <Link href="/" className="text-gold hover:text-gold-light transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-4xl font-bold text-white">{t('cart.title')}</h1>
            </div>
            <div className="w-24 h-1 bg-gold" />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-gold/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name_en}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                          {item.product.name_en}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {item.product.description_en}
                        </p>
                        <div className="text-2xl font-bold text-gold">
                          ${item.product.price.toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-center space-y-3">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityUpdate(item.product.id, item.quantity - 1)}
                            disabled={isUpdating === item.product.id}
                            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-200 disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          
                          <div className="w-12 text-center">
                            {isUpdating === item.product.id ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full mx-auto"
                              />
                            ) : (
                              <span className="text-white font-semibold">{item.quantity}</span>
                            )}
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuantityUpdate(item.product.id, item.quantity + 1)}
                            disabled={isUpdating === item.product.id}
                            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-200 disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="mt-4 pt-4 border-t border-gray-800 text-right">
                      <span className="text-gray-400">Item Total: </span>
                      <span className="text-xl font-bold text-gold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Clear Cart Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 text-right"
              >
                <button
                  onClick={clearCart}
                  className="text-gray-400 hover:text-red-400 transition-colors duration-200 underline"
                >
                  Clear Cart
                </button>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 sticky top-24">
                <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-400">
                    <span>Items ({totalItems})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>{t('cart.total')}</span>
                      <span className="text-gold">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gold text-black py-4 px-6 rounded-xl font-semibold text-lg hover:bg-gold-light transition-all duration-300 mb-4"
                  >
                    {t('cart.checkout')}
                  </motion.button>
                </Link>

                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-transparent border-2 border-gray-600 text-gray-300 py-4 px-6 rounded-xl font-semibold text-lg hover:border-gold hover:text-gold transition-all duration-300"
                  >
                    {t('cart.continueShopping')}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
