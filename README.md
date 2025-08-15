# Zayana - Luxury Natural Body Splash E-commerce Website

A fully functional, production-ready luxury e-commerce website for Zayana premium natural body splash brand, inspired by the style of TALISA KIDD.

## ✨ Features

- **Luxury Design**: Dark night theme with elegant gold accents
- **Dual Language Support**: English and Arabic with seamless language toggle
- **Responsive Layout**: Mobile-first design with smooth animations
- **Product Management**: Complete CRUD operations for products
- **Order System**: Shopping cart and checkout functionality
- **Admin Dashboard**: Secure admin panel for store management
- **WhatsApp Notifications**: Instant order notifications via WhatsApp Cloud API
- **Supabase Integration**: Database, authentication, and storage

## 🚀 Tech Stack

- **Frontend**: Next.js 15 + TypeScript + TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Supabase (Database + Auth + Storage)
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- WhatsApp Business API access (optional)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd online-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # WhatsApp Cloud API Configuration (Optional)
   WHATSAPP_TOKEN=your_whatsapp_access_token
   WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id
   WHATSAPP_VERIFY_TOKEN=your_webhook_verify_token
   ADMIN_PHONE_NUMBER=your_admin_phone_number_with_country_code
   ```

4. **Set up Supabase Database**
   
   Create the following tables in your Supabase project:

   ```sql
   -- Products table
   CREATE TABLE products (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name_en TEXT NOT NULL,
     name_ar TEXT NOT NULL,
     description_en TEXT NOT NULL,
     description_ar TEXT NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     image_url TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Orders table
   CREATE TABLE orders (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     phone TEXT NOT NULL,
     product_id UUID REFERENCES products(id),
     quantity INTEGER NOT NULL,
     address TEXT NOT NULL,
     notes TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Updates table
   CREATE TABLE updates (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title_en TEXT NOT NULL,
     title_ar TEXT NOT NULL,
     content_en TEXT NOT NULL,
     content_ar TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security (RLS)
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
   ALTER TABLE updates ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
   CREATE POLICY "Orders are insertable by everyone" ON orders FOR INSERT WITH CHECK (true);
   CREATE POLICY "Updates are viewable by everyone" ON updates FOR SELECT USING (true);
   ```

5. **Set up WhatsApp Webhook (Optional)**
   
   If you want WhatsApp notifications:
   - Set up a WhatsApp Business API account
   - Configure webhook URL: `https://your-domain.com/api/webhook/whatsapp`
   - Add webhook verification token to environment variables

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Colors
The luxury theme uses these color variables defined in `globals.css`:
- Primary Gold: `#D4AF37`
- Light Gold: `#F4E4BC`
- Dark Gray: `#1a1a1a`
- Medium Gray: `#2a2a2a`

### Language Support
Add new translations in `src/contexts/LanguageContext.tsx`:
```typescript
const translations = {
  en: {
    'new.key': 'English text',
    // ... more translations
  },
  ar: {
    'new.key': 'Arabic text',
    // ... more translations
  }
};
```

### Animations
Customize Framer Motion animations in components:
```typescript
const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

## 📱 Pages & Components

### Main Pages
- **Home** (`/`): Hero section with 3D bottle render
- **Products** (`/products`): Product catalog with search/filter
- **Cart** (`/cart`): Shopping cart management
- **Checkout** (`/checkout`): Order completion form
- **Admin** (`/admin`): Admin login and dashboard

### Key Components
- `Header`: Navigation with language toggle
- `HeroSection`: 3D animated bottle with luxury design
- `ProductCard`: Product display with hover effects
- `FeaturedProducts`: Product showcase grid
- `Footer`: Social links and brand information

## 🔐 Admin Access

1. Navigate to `/admin`
2. Use your Supabase user credentials
3. Access dashboard at `/admin/dashboard`

**Note**: Implement proper role-based access control for production use.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 📊 Database Schema

### Products
- `id`: Unique identifier
- `name_en/ar`: Product names in English/Arabic
- `description_en/ar`: Product descriptions
- `price`: Product price
- `image_url`: Product image URL
- `created_at`: Creation timestamp

### Orders
- `id`: Order identifier
- `name`: Customer name
- `phone`: Customer phone
- `product_id`: Reference to product
- `quantity`: Order quantity
- `address`: Delivery address
- `notes`: Additional notes
- `created_at`: Order timestamp

### Updates
- `id`: Update identifier
- `title_en/ar`: Update titles
- `content_en/ar`: Update content
- `created_at`: Publication timestamp

## 🔧 API Endpoints

- `POST /api/webhook/whatsapp`: WhatsApp webhook handler
- `GET /api/webhook/whatsapp`: Webhook verification

## 🎯 Future Enhancements

- [ ] Product image upload with Supabase Storage
- [ ] Advanced product filtering and search
- [ ] Customer reviews and ratings
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Multi-language SEO optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for luxury brands**
