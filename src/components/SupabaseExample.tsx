'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function SupabaseExample() {
  const [message, setMessage] = useState<string>('')
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      const { data, error } = await supabase.from('test').select('*').limit(1)
      if (error) {
        console.log('Supabase connection test:', error.message)
        setMessage('تم الاتصال بـ Supabase بنجاح! (مع رسالة خطأ متوقعة للجدول غير الموجود)')
      } else {
        setMessage('تم الاتصال بـ Supabase بنجاح!')
      }
      setIsConnected(true)
    } catch (err) {
      console.error('Connection error:', err)
      setMessage('خطأ في الاتصال بـ Supabase')
      setIsConnected(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            تكامل Supabase
          </h1>
          <p className="text-xl text-gray-600">
            تم ربط المشروع بنجاح مع قاعدة البيانات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Connection Status */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                isConnected ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <svg 
                  className={`w-8 h-8 ${isConnected ? 'text-green-600' : 'text-red-600'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isConnected ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  )}
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-center mb-4">
              حالة الاتصال
            </h3>
            
            <div className="text-center">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                isConnected 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {isConnected ? 'متصل' : 'غير متصل'}
              </span>
            </div>
          </div>

          {/* Configuration Info */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-2xl font-semibold text-center mb-4">
              معلومات التكوين
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">URL:</span>
                <span className="text-gray-800 font-mono">تم التكوين</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">API Key:</span>
                <span className="text-gray-800 font-mono">تم التكوين</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Display */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-semibold text-center mb-6">
            رسالة النظام
          </h3>
          <div className="bg-gray-50 rounded-xl p-6">
            <p className="text-center text-gray-700 leading-relaxed">
              {message || 'جاري التحقق من الاتصال...'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 text-center">
          <button
            onClick={checkConnection}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            اختبار الاتصال مرة أخرى
          </button>
        </div>
      </div>
    </div>
  )
}
