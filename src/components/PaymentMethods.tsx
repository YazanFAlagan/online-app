'use client'

import { useState } from 'react'
import { BanknotesIcon } from '@heroicons/react/24/outline'

export interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  isAvailable: boolean
  processingTime: string
  fees: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'cash-on-delivery',
    name: 'الدفع عند الاستلام',
    description: 'ادفع نقداً عند استلام الطلب',
    icon: BanknotesIcon,
    isAvailable: true,
    processingTime: 'عند الاستلام',
    fees: '5 جنيه'
  }
]

interface PaymentMethodsProps {
  selectedMethod: string
  onMethodSelect: (methodId: string) => void
}

export default function PaymentMethods({ selectedMethod, onMethodSelect }: PaymentMethodsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-black mb-4">طريقة الدفع</h2>
      <p className="text-sm text-gray-600 mb-6">الدفع عند الاستلام هو الطريقة الوحيدة المتاحة حالياً</p>
      
      {/* Payment Method */}
      <div className="grid grid-cols-1 gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="relative p-6 border-2 border-green-500 bg-green-50 shadow-md rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <method.icon className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-green-800">{method.name}</h3>
                <p className="text-green-700 mt-1">{method.description}</p>
                <div className="flex items-center space-x-6 mt-3 text-sm text-green-600">
                  <span className="flex items-center">
                    <span className="mr-2">⏰</span>
                    {method.processingTime}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-2">💰</span>
                    {method.fees}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cash on Delivery Info */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <BanknotesIcon className="w-6 h-6 text-orange-600" />
          <h3 className="text-lg font-semibold text-orange-800">معلومات الدفع عند الاستلام</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 text-lg">💰</span>
            <p className="text-sm text-orange-800">ستقوم بدفع المبلغ كاملاً عند استلام الطلب من المندوب</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 text-lg">📱</span>
            <p className="text-sm text-orange-800">سيتم التواصل معك عبر الهاتف لتأكيد موعد التوصيل</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 text-lg">⚠️</span>
            <p className="text-sm text-orange-800">رسوم إضافية 5 جنيه للدفع عند الاستلام</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-orange-600 text-lg">🚚</span>
            <p className="text-sm text-orange-800">التوصيل متاح في جميع أنحاء مصر</p>
          </div>
        </div>
      </div>
    </div>
  )
}
