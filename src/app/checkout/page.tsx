'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create orders for each cart item
      const orderPromises = items.map(async (item) => {
        const { data, error } = await supabase
          .from('orders')
          .insert({
            name: formData.name,
            phone: formData.phone,
            product_id: item.product.id,
            quantity: item.quantity,
            address: formData.address,
            notes: formData.notes,
          })
          .select()
          .single();

        if (error) throw error;
        return data;
      });

      const orders = await Promise.all(orderPromises);
      setOrderId(orders[0]?.id || 'unknown');
      setOrderSuccess(true);
      
      // Clear cart after successful order
      clearCart();
      
      // TODO: Send WhatsApp notification via webhook
      
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">
                {t('checkout.success')}
              </h1>
              <p className="text-xl text-gray-400 mb-6">
                Your order has been placed successfully!
              </p>
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <p className="text-gray-300 mb-2">Order ID: <span className="text-gold font-mono">{orderId}</span></p>
                <p className="text-gray-300 mb-4">We'll contact you soon to confirm your order.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => router.push('/')}
                className="bg-gold text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold-light transition-all duration-300"
              >
                Continue Shopping
              </button>
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
              <button
                onClick={() => router.back()}
                className="text-gold hover:text-gold-light transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-4xl font-bold text-white">{t('checkout.title')}</h1>
            </div>
            <div className="w-24 h-1 bg-gold" />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
                    <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">
                          {t('checkout.name')} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-gray-300 mb-2 font-medium">
                          {t('checkout.phone')} *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-300"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
                    <h2 className="text-2xl font-bold text-white mb-6">Delivery Information</h2>
                    
                    <div>
                      <label htmlFor="address" className="block text-gray-300 mb-2 font-medium">
                        {t('checkout.address')} *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                        placeholder="Enter your complete delivery address"
                      />
                    </div>
                    
                    <div className="mt-6">
                      <label htmlFor="notes" className="block text-gray-300 mb-2 font-medium">
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                        placeholder="Any special instructions or notes for delivery"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gold text-black py-4 px-8 rounded-xl font-semibold text-xl hover:bg-gold-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-black border-t-transparent rounded-full"
                        />
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <span>{t('checkout.submit')}</span>
                      </>
                    )}
                  </motion.button>
                </form>
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
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-gray-800">
                      <div className="flex-1">
                        <p className="text-white font-medium line-clamp-1">{item.product.name_en}</p>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-gold font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Total */}
                <div className="border-t border-gray-800 pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>{t('cart.total')}</span>
                    <span className="text-gold">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Truck className="w-5 h-5 text-gold" />
                    <span className="text-sm">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Shield className="w-5 h-5 text-gold" />
                    <span className="text-sm">Secure Checkout</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <CreditCard className="w-5 h-5 text-gold" />
                    <span className="text-sm">Multiple Payment Options</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
