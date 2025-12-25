// src/components/Header.tsx
import Button from "./Button";
import "./Header.css";
import { motion } from "framer-motion";

const Header = () => {
  return (
    // THÊM id="home" + các class để Hero nằm chính giữa màn hình
    <section 
      id="home"
      className="w-full min-h-screen flex items-center justify-center bg-cover bg-center header-background relative"
    >
      {/* Overlay card – nằm giữa */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl bg-fill border border-border rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12 gap-10 lg:gap-16 mx-4 lg:mx-auto"
      >
        {/* Left: Lời mời */}
        <div className="text-center lg:text-left max-w-lg">
          <h2 className="font-Bebas uppercase text-5xl lg:text-6xl tracking-wider text-text mb-4">
            Have a cup of coffee
          </h2>
          <p className="text-secondary font-Source text-lg lg:text-xl leading-relaxed">
            At Nora, every cup of coffee is an experience. Delicate flavors, a cozy atmosphere, and joy that spreads.
          </p>
          <div className="mt-6">
            <Button>Book a table</Button>
          </div>
        </div>

        {/* Right: Giờ mở cửa + Xem tất cả chi nhánh */}
        <div className="text-center lg:text-left">
          <h3 className="font-Bebas uppercase text-4xl lg:text-5xl tracking-wider text-text mb-6">
            It's Coffee Time!
          </h3>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-border/50 shadow-md">
            <div>
              <p className="text-orange-600 font-semibold text-sm uppercase tracking-widest">
                85 Doan Tran Nghiep
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-secondary font-Source text-lg">Mon – Sun</span>
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-secondary font-Source text-lg font-medium">6:30 – 22:00</span>
              </div>
            </div>

            <a
              href="https://beacons.ai/noracoffeeroastery?fbclid=IwY2xjawOu9jRleHRuA2FlbQIxMABicmlkETEwRnVQR3pJZTRTUTJqS3NHc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHlHiAypO13kBoWk4kHjC0HpcQRBCkeayIOX8cNWE6vJ6UbH3eniwNntFDB5b_aem_KBnqo_ERsUrJjjq5jAgCKw"
              className="inline-flex items-center gap-2 mt-5 text-orange-600 font-medium hover:text-orange-700 transition-colors text-sm uppercase tracking-wider"
            >
              View all 6 branches
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Button cho mobile */}
          <div className="lg:hidden mt-8">
            <Button>Book a table</Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Header;