// src/components/About.tsx
import aboutImage from "../assets/images/aboutImage.png";
import Button from "./Button";
// THÊM DÒNG NÀY ĐỂ KHÔNG BỊ LỖI
import { motion } from "framer-motion";

const About = () => {
  return (
    <section 
      id="about" 
      className="w-full py-24 lg:py-1 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#faf9f7]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 xl:px-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Hình ly latte */}
        <div className="order-2 lg:order-1 flex justify-center lg:justify-end">
          <img
            src={aboutImage}
            alt="Nora Coffee - Latte Art"
            className="w-full max-w-md lg:max-w-lg xl:max-w-2xl drop-shadow-2xl hover:scale-105 transition-transform duration-700 rounded-2xl"
          />
        </div>

        {/* Nội dung chữ – căn giữa màn hình */}
        <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-Bebas uppercase text-[80px] lg:text-[110px] xl:text-[130px] leading-tight tracking-wider text-text mb-6"
          >
            About Us
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg lg:text-xl xl:text-2xl font-Source font-light text-secondary leading-relaxed max-w-2xl"
          >
            Welcome to Nora Coffee Roastery, where every cup tells a story of passion and craftsmanship. 
            We roast our own beans with care, brew with love, and serve in a warm, inviting space designed 
            for you to relax, connect, and enjoy the perfect coffee moment. From classic espresso to creative 
            latte art, each drink is made fresh by our skilled baristas — just for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
          >
            <Button className="text-lg px-10 py-5">Discover More</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;