// src/components/Menu.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type MenuItem = { name: string; desc?: string; price: number };
type MenuSection = { category: string; highlight?: boolean; items: MenuItem[] };

const menuData: MenuSection[] = [
  { category: "Handbrew", items: [{ name: "V60", price: 60 }, { name: "Phin Drip", price: 55 }] },
  {
    category: "Signature",
    highlight: true,
    items: [
      { name: "Metal", desc: "Strong Vietnamese Coffee", price: 38 },
      { name: "Little", desc: "Espresso Ara, Whipping Cream", price: 45 },
      { name: "Ô Phê", desc: "Olong Tea, Coldbrew", price: 48 },
      { name: "Mori", desc: "Espresso Ara & Caramel", price: 45 },
      { name: "Happy", desc: "Passion Fruit, Espresso Ara, Pineapple, Coconut Milk", price: 48 },
    ],
  },
  {
    category: "100% Arabica",
    items: [
      { name: "Espresso", price: 38 },
      { name: "Espresso Tonic", price: 45 },
      { name: "Americano", price: 45 },
      { name: "Cappuccino", price: 48 },
      { name: "Caramel Macchiato", price: 50 },
      { name: "Latte", price: 48 },
    ],
  },
  {
    category: "100% Robusta",
    items: [
      { name: "Black Coffee", price: 30 },
      { name: "White Coffee", price: 38 },
      { name: "Mellow", price: 38 },
      { name: "Milk Coffee", price: 38 },
      { name: "Salted Cream", price: 40 },
    ],
  },
  {
    category: "Coldbrew",
    items: [
      { name: "No.0 Original Coldbrew", price: 45 },
      { name: "No.1 Citron Coldbrew", price: 48 },
      { name: "No.2 Tangerine Coldbrew", price: 48 },
      { name: "No.3 Pineapple Coldbrew", price: 48 },
    ],
  },
  { category: "Nora Juice", items: [{ name: "Lemonade With Chia Seed", price: 38 }, { name: "Pineapple Passion Fruit", price: 45 }, { name: "Tangerine", price: 40 }] },
  {
    category: "Nora Tea",
    items: [
      { name: "Guava Tea", price: 45 },
      { name: "Mango Passion Fruit Tea", price: 48 },
      { name: "Tropical Hibiscus Tea", price: 48 },
      { name: "Olong Creamy", price: 48 },
      { name: "Hibiscus Peach Tea", price: 48 },
    ],
  },
  {
    category: "Nora Iced",
    items: [
      { name: "Matcha Ice Blend", price: 52 },
      { name: "Matcha Joy", price: 52 },
      { name: "Coconut Matcha", price: 52 },
      { name: "Coconut Coffee", price: 52 },
      { name: "Mango Passion Smoothie", price: 52 },
    ],
  },
  {
    category: "Milktea",
    items: [
      { name: "Matcha Milktea", price: 48 },
      { name: "Ô Phê", price: 48 },
      { name: "Creamy Milktea", price: 48 },
      { name: "Choco Milktea", price: 48 },
    ],
  },
  {
    category: "Brunch",
    items: [
      { name: "Croissant", price: 29 },
      { name: "Danish Choco", price: 29 },
      { name: "Ham & Cheese Croissant", price: 38 },
      { name: "Choco Fruity Croffle", price: 48 },
      { name: "Cheese Croffle", price: 48 },
      { name: "Salted Cream Croffle", price: 48 },
    ],
  },
];

// Skeleton cho một section menu
const SkeletonSection = () => (
  <div className="animate-pulse">
    <div className="h-10 bg-gray-200 rounded w-48 mb-8"></div>
    <div className="space-y-7">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex justify-between items-baseline">
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      ))}
    </div>
  </div>
);

const Menu = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Giả lập loading 1.5s (sau này có thể thay bằng fetch thật từ API)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="menu"
      className="w-full py-32 min-h-screen flex items-center justify-center bg-gradient-to-b from-[#faf9f7] to-[#f5f1ed]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-Bebas text-8xl lg:text-9xl tracking-wider text-gray-900">
            MENU
          </h2>
          <p className="mt-6 text-lg text-gray-600 font-light tracking-wide">
            Hand-roasted daily • Vietnamese soul in every cup
          </p>
        </motion.div>

        {/* Grid menu với skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
          {isLoading
            ? // Hiển thị 10 skeleton sections (đủ cho layout)
              Array(10)
                .fill(0)
                .map((_, idx) => (
                  <motion.div
                    key={`skeleton-${idx}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                  >
                    <SkeletonSection />
                  </motion.div>
                ))
            : menuData.map((section, idx) => (
                <motion.article
                  key={section.category}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.08 }}
                  className="group"
                >
                  <h3
                    className={`font-Bebas text-3xl tracking-widest mb-8 pb-4 border-b ${
                      section.highlight
                        ? "text-orange-600 border-orange-200"
                        : "text-gray-900 border-gray-200"
                    }`}
                  >
                    {section.category}
                  </h3>

                  <div className="space-y-7">
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex justify-between items-baseline gap-6 group/item"
                      >
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium text-lg leading-tight group-hover/item:text-orange-600 transition-colors duration-300">
                            {item.name}
                          </p>
                          {item.desc && (
                            <p className="text-gray-500 text-sm mt-1 font-light">
                              {item.desc}
                            </p>
                          )}
                        </div>

                        <span className="text-2xl font-light text-gray-900 tabular-nums">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
        </div>

        {/* Note nhỏ */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-24 text-gray-500 text-sm tracking-wider"
        >
          Prices in thousand VND • VAT included
        </motion.p>
      </div>
    </section>
  );
};

export default Menu;