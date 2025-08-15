import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />
      <div className="pt-16"> {/* Add top padding to account for fixed header */}
        <HeroSection />
        <FeaturedProducts />
      </div>
      <Footer />
    </main>
  );
}
