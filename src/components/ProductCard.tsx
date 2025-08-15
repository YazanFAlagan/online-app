'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    addToCart(product, 1);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const getLocalizedText = (en: string, ar: string) => {
    return language === 'ar' ? ar : en;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-all duration-500"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image_url}
          alt={getLocalizedText(product.name_en, product.name_ar)}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onQuickView?.(product)}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gold/80 hover:text-black transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-all duration-300"
          >
            <Heart className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="bg-gold text-black px-3 py-1 rounded-full text-xs font-bold"
          >
            Premium
          </motion.div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        {/* Name */}
        <h3 className="text-xl font-semibold text-white group-hover:text-gold transition-colors duration-300 line-clamp-2">
          {getLocalizedText(product.name_en, product.name_ar)}
        </h3>
        
        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2">
          {getLocalizedText(product.description_en, product.description_ar)}
        </p>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gold">
            ${product.price.toFixed(2)}
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="w-4 h-4 text-gold fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full bg-gold text-black py-3 px-6 rounded-xl font-semibold hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isAddingToCart ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
              />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>{t('products.addToCart')}</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 rounded-2xl pointer-events-none"
      />
    </motion.div>
  );
}
