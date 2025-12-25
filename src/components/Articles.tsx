// src/components/Articles.tsx
"use client";

import { useState, useEffect } from "react";
import { articles } from "../data";
import Button from "./Button";
import { motion } from "framer-motion";

const SkeletonArticle = () => (
  <div className="group bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse">
    <div className="relative overflow-hidden">
      <div className="w-full h-64 bg-gray-200"></div>
    </div>
    <div className="p-8">
      <div className="h-4 bg-gray-200 rounded w-32 mb-3"></div>
      <div className="h-7 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-7 bg-gray-200 rounded w-4/5"></div>
    </div>
  </div>
);

const Articles = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Giả lập loading 1.5s (sau này có thể thay bằng fetch thật từ API/blog)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="articles"
      className="w-full py-32 min-h-screen flex items-center justify-center bg-gradient-to-b from-[#faf9f7] to-white"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-Bebas text-8xl lg:text-9xl tracking-wider text-gray-900">
            NEW ARTICLES
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
            Fresh roasts, new recipes, and the stories behind every cup at Nora Coffee Roastery.
          </p>
        </motion.div>

        {/* Danh sách bài viết với skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading
            ? // Hiển thị 6 skeleton cards (đủ cho layout 3 cột)
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <SkeletonArticle />
                  </motion.div>
                ))
            : articles.map((article, index) => (
                <motion.article
                  key={article.category}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.description}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-8">
                    <span className="text-sm uppercase tracking-wider text-orange-600 font-medium">
                      {article.category}
                    </span>
                    <h3 className="mt-3 text-2xl font-medium text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
                      {article.description}
                    </h3>
                  </div>
                </motion.article>
              ))}
        </div>

        {/* NÚT VIEW ALL ARTICLES */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20"
        >
          <a
            href="https://www.facebook.com/NoraCoffeeRoastery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className="text-lg px-12 py-5">View All Articles</Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Articles;