'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sun, Moon, Sparkles, Leaf, Waves } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const themes = [
  { id: 'light', name: 'فاتح', icon: Sun, color: 'from-yellow-400 to-orange-500' },
  { id: 'dark', name: 'داكن', icon: Moon, color: 'from-gray-800 to-gray-900' },
  { id: 'luxury', name: 'فاخر', icon: Sparkles, color: 'from-amber-500 to-yellow-600' },
  { id: 'nature', name: 'طبيعي', icon: Leaf, color: 'from-green-500 to-emerald-600' },
  { id: 'ocean', name: 'محيط', icon: Waves, color: 'from-blue-500 to-cyan-600' },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentTheme = themes.find(t => t.id === theme);
  const IconComponent = currentTheme?.icon || Palette;

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-3 rounded-full bg-gradient-to-r ${currentTheme?.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
        title="تغيير الألوان"
      >
        <IconComponent className="w-5 h-5" />
        
        {/* Active Theme Indicator */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-gray-800"
        />
      </motion.button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
            >
              <div className="p-2">
                {themes.map((themeOption) => {
                  const ThemeIcon = themeOption.icon;
                  const isActive = theme === themeOption.id;
                  
                  return (
                    <motion.button
                      key={themeOption.id}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setTheme(themeOption.id as any);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-r ' + themeOption.color + ' text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <ThemeIcon className="w-5 h-5" />
                      <span className="font-medium">{themeOption.name}</span>
                      
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Footer */}
              <div className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  اختر المظهر المفضل لديك
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
