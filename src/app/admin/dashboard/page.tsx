'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  ShoppingCart, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  LogOut,
  TrendingUp,
  Users,
  DollarSign,
  Eye
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Product, Order, Update } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AdminDashboard() {
  const router = useRouter();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [updates, setUpdates] = useState<Update[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddUpdate, setShowAddUpdate] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/admin');
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch orders with product details
      const { data: ordersData } = await supabase
        .from('orders')
        .select(`
          *,
          product:products(*)
        `)
        .order('created_at', { ascending: false });

      // Fetch updates
      const { data: updatesData } = await supabase
        .from('updates')
        .select('*')
        .order('created_at', { ascending: false });

      setProducts(productsData || []);
      setOrders(ordersData || []);
      setUpdates(updatesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId);

        if (error) throw error;
        fetchData(); // Refresh data
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleDeleteUpdate = async (updateId: string) => {
    if (confirm('Are you sure you want to delete this update?')) {
      try {
        const { error } = await supabase
          .from('updates')
          .delete()
          .eq('id', updateId);

        if (error) throw error;
        fetchData(); // Refresh data
      } catch (error) {
        console.error('Error deleting update:', error);
        alert('Failed to delete update');
      }
    }
  };

  const stats = [
    {
      name: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20'
    },
    {
      name: 'Total Orders',
      value: orders.length,
      icon: ShoppingCart,
      color: 'text-green-400',
      bgColor: 'bg-green-400/20'
    },
    {
      name: 'Total Updates',
      value: updates.length,
      icon: FileText,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20'
    },
    {
      name: 'Total Revenue',
      value: `$${orders.reduce((sum, order) => sum + (order.product?.price || 0) * order.quantity, 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'text-gold',
      bgColor: 'bg-gold/20'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="flex items-center justify-center h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-2">Manage Zayana products and orders</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-900/50 rounded-lg p-1 mb-8 border border-gray-800">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'products', name: 'Products', icon: Package },
            { id: 'orders', name: 'Orders', icon: ShoppingCart },
            { id: 'updates', name: 'Updates', icon: FileText }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gold text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-800/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.product?.name_en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gold">${((order.product?.price || 0) * order.quantity).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Products</h2>
              <button
                onClick={() => setShowAddProduct(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold-light transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-800/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                              <Package className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">{product.name_en}</div>
                              <div className="text-sm text-gray-400">{product.name_ar}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gold font-semibold">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(product.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-400 hover:text-blue-300">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-400 hover:text-green-300">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">All Orders</h2>
            
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-800/30">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.product?.name_en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gold font-semibold">
                          ${((order.product?.price || 0) * order.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Updates Tab */}
        {activeTab === 'updates' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">News & Updates</h2>
              <button
                onClick={() => setShowAddUpdate(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold-light transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add Update</span>
              </button>
            </div>

            <div className="grid gap-6">
              {updates.map((update) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{update.title_en}</h3>
                      <h4 className="text-md font-medium text-gray-400 mb-2">{update.title_ar}</h4>
                    </div>
                    <div className="flex space-x-2">
                      <button className="text-green-400 hover:text-green-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUpdate(update.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{update.content_en}</p>
                  <p className="text-gray-400 mb-4">{update.content_ar}</p>
                  <div className="text-sm text-gray-500">
                    {new Date(update.created_at).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
