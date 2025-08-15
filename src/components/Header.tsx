'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/products', label: t('nav.shop') },
    { href: '/about', label: t('nav.about') },
    { href: '/contact', label: t('nav.contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-300" style={{
      backgroundColor: `var(--bg-primary)`,
      borderColor: `var(--border)`,
      opacity: 0.95
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold transition-colors duration-300" style={{ color: `var(--accent)` }}
            >
              ZAYANA
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-300 font-medium" style={{
                  color: `var(--text-secondary)`,
                }} onMouseEnter={(e) => e.currentTarget.style.color = `var(--accent)`}
                   onMouseLeave={(e) => e.currentTarget.style.color = `var(--text-secondary)`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="p-2 transition-colors duration-300" style={{
                color: `var(--text-secondary)`,
              }} onMouseEnter={(e) => e.currentTarget.style.color = `var(--accent)`}
                 onMouseLeave={(e) => e.currentTarget.style.color = `var(--text-secondary)`}
              title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe className="w-5 h-5" />
            </motion.button>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 transition-colors duration-300" style={{
                  color: `var(--text-secondary)`,
                }} onMouseEnter={(e) => e.currentTarget.style.color = `var(--accent)`}
                   onMouseLeave={(e) => e.currentTarget.style.color = `var(--text-secondary)`}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gold text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 transition-colors duration-300" style={{
                color: `var(--text-secondary)`,
              }} onMouseEnter={(e) => e.currentTarget.style.color = `var(--accent)`}
                 onMouseLeave={(e) => e.currentTarget.style.color = `var(--text-secondary)`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t transition-all duration-300" style={{
              backgroundColor: `var(--bg-primary)`,
              borderColor: `var(--border)`,
              opacity: 0.95
            }}
          >
            <nav className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block transition-colors duration-300 font-medium py-2" style={{
                    color: `var(--text-secondary)`,
                  }} onMouseEnter={(e) => e.currentTarget.style.color = `var(--accent)`}
                     onMouseLeave={(e) => e.currentTarget.style.color = `var(--text-secondary)`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Theme Toggle */}
              <div className="pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">المظهر:</span>
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
