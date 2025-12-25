// src/components/Footer.tsx
import logo from "../assets/images/logo.png";
import { 
  IoLogoFacebook, 
  IoLogoInstagram, 
  IoLogoTiktok 
} from "react-icons/io5";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    // THÊM id="contact" + các class để tiêu đề nằm chính giữa màn hình
    <section 
      id="contact"
      className="w-full py-32 min-h-screen flex items-center justify-center bg-gradient-to-b from-[#faf9f7] to-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Tiêu đề – nằm giữa màn hình */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-Bebas text-8xl lg:text-9xl tracking-wider text-gray-900">
            CONTACT
          </h2>
          <p className="mt-6 text-lg text-gray-600 font-light tracking-wide max-w-3xl mx-auto">
            We're always happy to hear from you. Reach out anytime!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Cột 1: Logo + slogan + social */}
          <div className="lg:col-span-4 space-y-8">
            <img src={logo} alt="Nora Coffee Roastery" className="w-48" />
            
            <p className="text-secondary font-light text-base leading-relaxed max-w-xs">
              From Nature, honoring Originality,<br />
              Roasted to grow & Bloom everywhere.
            </p>

            <div className="flex items-center gap-7">
              <a 
                href="https://www.facebook.com/share/14SULzoppvT/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow Nora Coffee Roastery on Facebook"
                className="text-icons hover:text-text transition-colors"
              >
                <IoLogoFacebook size={26} />
              </a>

              <a 
                href="https://www.instagram.com/noracoffeeroastery" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow Nora Coffee Roastery on Instagram"
                className="text-icons hover:text-text transition-colors"
              >
                <IoLogoInstagram size={26} />
              </a>

              <a 
                href="https://www.threads.net/@noracoffeeroastery" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow Nora Coffee Roastery on Threads"
                className="text-icons hover:text-text transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M331.5 235.7c21.8-13.1 37.8-34.8 37.8-61.6 0-39.2-31.8-71-71-71-30.9 0-57.4 19.9-67.1 47.7l-28.7-14.5C216.8 99.4 259.5 71 309.5 71c66.3 0 120 53.7 120 120 0 48.7-29.1 90.7-70.8 109.6-9.1 4.1-18.9 6.4-29 6.4-23.5 0-45-12.4-56.8-32.7-5.7-9.9-8.9-21.4-8.9-33.6 0-35.3 28.7-64 64-64 26.4 0 48.9 16 59.1 38.7l27.5-16.1c-15.8-33.3-49.7-55.6-86.6-55.6-53 0-96 43-96 96s43 96 96 96c19.1 0 36.9-5.6 52-15.2 33.9 19.9 57.1 56.6 57.1 99.4 0 61.9-50.1 112-112 112-61.9 0-112-50.1-112-112 0-28.2 10.4-54 27.5-74.1l-27.3-16.3C127.8 269.4 116 298.5 116 329.6c0 88.4 71.6 160 160 160s160-71.6 160-160c0-54.9-27.7-103.3-70.5-133.9z"/>
                </svg>
              </a>

              <a 
                href="https://www.tiktok.com/@noracoffeeroastery" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow Nora Coffee Roastery on TikTok"
                className="text-icons hover:text-text transition-colors"
              >
                <IoLogoTiktok size={26} />
              </a>
            </div>
          </div>

          {/* Các cột còn lại */}
          <div className="lg:col-span-2">
            <h4 className="font-Bebas text-2xl tracking-wider mb-6 text-text">Explore</h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Our Menu", "Reservation", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-secondary hover:text-text transition-colors uppercase tracking-wide text-sm font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-Bebas text-2xl tracking-wider mb-6 text-text">Branches</h4>
            <ul className="space-y-4 text-secondary text-sm leading-relaxed">
              <li className="font-medium">
                CN1 • 85 Doan Tran Nghiep, Vinh Phuoc<br />
                Nha Trang, Khanh Hoa, Viet Nam
              </li>
              <li className="font-medium">
                CN2 • 172 Me Linh, Tan Tien<br />
                Nha Trang, Khanh Hoa, Viet Nam
              </li>
              <li className="font-medium">
                CN3 • 12 Bach Dang, Tan Tien<br />
                Nha Trang, Khanh Hoa, Viet Nam
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-Bebas text-2xl tracking-wider mb-6 text-text">Contact</h4>
            <div className="space-y-4 text-secondary text-sm">
              <p className="font-medium uppercase tracking-wider">
                noracoffeeroastery@gmail.com
              </p>
              <p className="font-medium">079 881 1779</p>
              <p className="text-xs italic">Monday – Sunday : 6:30 – 22:00</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-20 text-gray-500 text-sm"
        >
          © 2025 Nora Coffee Roastery. Crafted with love by Bảo Nguyễn
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;