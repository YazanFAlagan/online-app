export interface Product {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number;
  image_url: string;
  created_at: string;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  product_id: string;
  quantity: number;
  address: string;
  created_at: string;
  product?: Product; // For joined queries
}

export interface Update {
  id: string;
  title_en: string;
  title_ar: string;
  content_en: string;
  content_ar: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Language = 'en' | 'ar';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
}

export interface WhatsAppNotification {
  order: Order;
  product: Product;
}
