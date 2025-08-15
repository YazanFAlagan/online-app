'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
      theme === 'light' ? 'bg-gradient-to-br from-blue-50 via-white to-blue-100' :
      theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' :
      theme === 'luxury' ? 'bg-gradient-to-br from-black via-gray-900 to-black' :
      theme === 'nature' ? 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900' :
      'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background particles */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(212, 175, 55, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
        
        {/* Floating jasmine flowers */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={floatingVariants}
            animate="float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
            }}
            className="absolute w-4 h-4 text-gold/30"
          >
            ✿
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left side - Text content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`inline-flex items-center space-x-2 rounded-full px-4 py-2 text-sm font-medium ${
                  theme === 'light' ? 'bg-blue-100 border border-blue-200 text-blue-600' :
                  theme === 'dark' ? 'bg-gray-800 border border-gray-600 text-yellow-400' :
                  theme === 'luxury' ? 'bg-gold/10 border border-gold/20 text-gold' :
                  theme === 'nature' ? 'bg-green-100 border border-green-200 text-green-600' :
                  'bg-blue-100 border border-blue-200 text-blue-600'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Premium Natural Care</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">{t('hero.title')}</span>
                <br />
                <span className="text-gold">{t('hero.subtitle')}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group px-8 py-4 rounded-full font-semibold text-lg flex items-center space-x-2 transition-all duration-300 shadow-2xl ${
                  theme === 'light' ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25' :
                  theme === 'dark' ? 'bg-yellow-500 text-black hover:bg-yellow-600 shadow-yellow-500/25' :
                  theme === 'luxury' ? 'bg-gold text-black hover:bg-gold-light shadow-gold/25' :
                  theme === 'nature' ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-500/25' :
                  'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/25'
                }`}
                >
                  <span>{t('hero.cta')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side - 3D Bottle Render */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center items-center"
          >
            <div className="relative">
              {/* Main bottle container */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative w-80 h-96 perspective-1000"
              >
                {/* Bottle silhouette */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold/20 via-gold/10 to-transparent rounded-full blur-3xl opacity-60" />
                
                {/* Main bottle */}
                <div className="relative w-full h-full">
                  {/* Bottle body */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-80 bg-gradient-to-b from-gold/30 via-gold/20 to-transparent rounded-t-full border border-gold/40" />
                  
                  {/* Bottle neck */}
                  <div className="absolute bottom-80 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gradient-to-b from-gold/40 to-gold/20 rounded-t-full border border-gold/50" />
                  
                  {/* Bottle cap */}
                  <div className="absolute bottom-96 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gradient-to-b from-gold/60 to-gold/40 rounded-full border border-gold/60" />
                  
                  {/* Liquid inside */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-28 h-72 bg-gradient-to-b from-gold/40 via-gold/20 to-transparent rounded-t-full opacity-80" />
                </div>

                {/* Floating elements around bottle */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0"
                >
                  {/* Jasmine flowers */}
                  <div className="absolute -top-8 -left-8 text-2xl text-gold/60">🌸</div>
                  <div className="absolute -top-4 -right-4 text-xl text-gold/50">🌺</div>
                  <div className="absolute top-20 -left-12 text-lg text-gold/40">🌼</div>
                  <div className="absolute top-32 -right-8 text-xl text-gold/50">💐</div>
                  
                  {/* Fruits */}
                  <div className="absolute -bottom-8 -left-16 text-xl text-orange-400/60">🍊</div>
                  <div className="absolute -bottom-12 -right-20 text-lg text-red-400/50">🍎</div>
                  <div className="absolute bottom-16 -left-8 text-lg text-yellow-400/40">🍋</div>
                  
                  {/* Oil drops */}
                  <div className="absolute top-16 left-8 w-2 h-2 bg-gold/60 rounded-full" />
                  <div className="absolute top-24 right-12 w-1.5 h-1.5 bg-gold/50 rounded-full" />
                  <div className="absolute top-40 left-16 w-1 h-1 bg-gold/40 rounded-full" />
                </motion.div>
              </motion.div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gold/5 rounded-full blur-3xl scale-150" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gold rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
