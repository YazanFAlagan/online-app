import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zayana - Premium Natural Body Splash",
  description: "Luxury natural body splash with jasmine, fruits, and essential oils. Experience the essence of premium natural care.",
  keywords: "body splash, natural, luxury, jasmine, essential oils, premium care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-all duration-300`}
      >
        <LanguageProvider>
          <CartProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
