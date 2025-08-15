'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageContextType } from '@/types';

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'Experience Luxury',
    'hero.subtitle': 'Premium Natural Body Splash',
    'hero.description': 'Discover the essence of jasmine, fruits, and essential oils in our signature collection',
    'hero.cta': 'Shop Now',
    
    // Products
    'products.featured': 'Featured Products',
    'products.viewAll': 'View All Products',
    'products.addToCart': 'Add to Cart',
    'products.outOfStock': 'Out of Stock',
    'products.price': 'Price',
    'products.quantity': 'Quantity',
    
    // Cart & Checkout
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.continueShopping': 'Continue Shopping',
    
    // Checkout Form
    'checkout.title': 'Complete Your Order',
    'checkout.name': 'Full Name',
    'checkout.phone': 'Phone Number',
    'checkout.address': 'Delivery Address',
    'checkout.product': 'Product',
    'checkout.quantity': 'Quantity',
    'checkout.submit': 'Place Order',
    'checkout.success': 'Order placed successfully!',
    
    // About
    'about.title': 'About Zayana',
    'about.description': 'We are dedicated to creating the finest natural body care products using only the highest quality ingredients.',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.description': 'Have questions? We\'d love to hear from you.',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.follow': 'Follow Us',
    'footer.rights': 'All rights reserved',
    
    // Admin
    'admin.login': 'Admin Login',
    'admin.dashboard': 'Dashboard',
    'admin.products': 'Products',
    'admin.orders': 'Orders',
    'admin.updates': 'Updates',
    'admin.logout': 'Logout',
    'admin.addProduct': 'Add Product',
    'admin.editProduct': 'Edit Product',
    'admin.deleteProduct': 'Delete Product',
    'admin.save': 'Save',
    'admin.cancel': 'Cancel',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.close': 'Close',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.shop': 'المتجر',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.admin': 'الإدارة',
    
    // Hero Section
    'hero.title': 'اختبر الفخامة',
    'hero.subtitle': 'سبراي طبيعي فاخر للجسم',
    'hero.description': 'اكتشف جوهر الياسمين والفواكه والزيوت الأساسية في مجموعتنا المميزة',
    'hero.cta': 'تسوق الآن',
    
    // Products
    'products.featured': 'المنتجات المميزة',
    'products.viewAll': 'عرض جميع المنتجات',
    'products.addToCart': 'أضف إلى السلة',
    'products.outOfStock': 'نفذت الكمية',
    'products.price': 'السعر',
    'products.quantity': 'الكمية',
    
    // Cart & Checkout
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلة التسوق فارغة',
    'cart.total': 'المجموع',
    'cart.checkout': 'إتمام الطلب',
    'cart.continueShopping': 'مواصلة التسوق',
    
    // Checkout Form
    'checkout.title': 'أكمل طلبك',
    'checkout.name': 'الاسم الكامل',
    'checkout.phone': 'رقم الهاتف',
    'checkout.address': 'عنوان التوصيل',
    'checkout.product': 'المنتج',
    'checkout.quantity': 'الكمية',
    'checkout.submit': 'إرسال الطلب',
    'checkout.success': 'تم إرسال الطلب بنجاح!',
    
    // About
    'about.title': 'عن زيانا',
    'about.description': 'نحن متخصصون في إنشاء أفضل منتجات العناية الطبيعية بالجسم باستخدام أعلى جودة من المكونات.',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.description': 'لديك أسئلة؟ نود أن نسمع منك.',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    
    // Footer
    'footer.follow': 'تابعنا',
    'footer.rights': 'جميع الحقوق محفوظة',
    
    // Admin
    'admin.login': 'تسجيل دخول المدير',
    'admin.dashboard': 'لوحة التحكم',
    'admin.products': 'المنتجات',
    'admin.orders': 'الطلبات',
    'admin.updates': 'التحديثات',
    'admin.logout': 'تسجيل الخروج',
    'admin.addProduct': 'إضافة منتج',
    'admin.editProduct': 'تعديل المنتج',
    'admin.deleteProduct': 'حذف المنتج',
    'admin.save': 'حفظ',
    'admin.cancel': 'إلغاء',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجح!',
    'common.close': 'إغلاق',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
    
    // Update document direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
