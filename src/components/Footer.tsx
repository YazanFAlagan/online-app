'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'info@zayana.com', href: 'mailto:info@zayana.com' },
    { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: MapPin, text: 'Luxury District, Premium City', href: '#' },
  ];

  const footerLinks = [
    { href: '/about', label: t('nav.about') },
    { href: '/products', label: t('nav.shop') },
    { href: '/contact', label: t('nav.contact') },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ];

  return (
    <footer className="border-t transition-all duration-300" style={{
      backgroundColor: `var(--bg-primary)`,
      borderColor: `var(--border)`
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-bold transition-colors duration-300" style={{ color: `var(--accent)` }}
              >
                ZAYANA
              </motion.div>
            </Link>
            
            <p className="mb-6 leading-relaxed transition-colors duration-300" style={{ color: `var(--text-secondary)` }}>
              Premium natural body care products crafted with the finest ingredients. 
              Experience luxury in every drop.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300" style={{
                    backgroundColor: `var(--bg-tertiary)`,
                    color: `var(--text-secondary)`,
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.color = `var(--accent)`;
                    e.currentTarget.style.backgroundColor = `var(--bg-secondary)`;
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.color = `var(--text-secondary)`;
                    e.currentTarget.style.backgroundColor = `var(--bg-tertiary)`;
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold mb-6 transition-colors duration-300" style={{ color: `var(--text-primary)` }}>Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="transition-colors duration-300 hover:translate-x-1 inline-block" style={{
                      color: `var(--text-secondary)`,
                    }} onMouseEnter={(e) => e.currentTarget.style.color = `var(--accent)`}
                       onMouseLeave={(e) => e.currentTarget.style.color = `var(--text-secondary)`}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold mb-6 transition-colors duration-300" style={{ color: `var(--text-primary)` }}>Contact Info</h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <motion.li
                  key={contact.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300" style={{
                    backgroundColor: `var(--bg-tertiary)`,
                    color: `var(--accent)`
                  }}>
                    <contact.icon className="w-4 h-4" />
                  </div>
                  <a
                    href={contact.href}
                    className="transition-colors duration-300" style={{
                      color: `var(--text-secondary)`,
                    }} onMouseEnter={(e) => e.currentTarget.style.color = `var(--accent)`}
                       onMouseLeave={(e) => e.currentTarget.style.color = `var(--text-secondary)`}
                  >
                    {contact.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold mb-6 transition-colors duration-300" style={{ color: `var(--text-primary)` }}>Stay Updated</h3>
            <p className="mb-4 transition-colors duration-300" style={{ color: `var(--text-secondary)` }}>
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg transition-colors duration-300 focus:outline-none" style={{
                  backgroundColor: `var(--bg-tertiary)`,
                  borderColor: `var(--border)`,
                  color: `var(--text-primary)`,
                }} placeholder="Enter your email" onFocus={(e) => e.currentTarget.style.borderColor = `var(--accent)`}
                   onBlur={(e) => e.currentTarget.style.borderColor = `var(--border)`}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300" style={{
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
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t mt-12 pt-8 transition-all duration-300" style={{
            borderColor: `var(--border)`
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm transition-colors duration-300" style={{ color: `var(--text-secondary)` }}>
              © {currentYear} Zayana. {t('footer.rights')}
            </div>
            
            <div className="flex items-center space-x-6 text-sm transition-colors duration-300" style={{ color: `var(--text-secondary)` }}>
              <span>Made with ❤️ for luxury</span>
              <div className="w-1 h-1 rounded-full transition-colors duration-300" style={{ backgroundColor: `var(--border)` }}></div>
              <span>Premium Quality</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
