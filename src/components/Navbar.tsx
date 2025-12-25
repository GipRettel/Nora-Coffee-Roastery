// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { IoMenuOutline, IoSearchOutline } from "react-icons/io5";
import logo from "../assets/images/logo.png";
import { navItems } from "../data";
import AuthModal from "./AuthModal";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

const Navbar = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="w-full flex flex-col sticky top-0 z-50 bg-white shadow-md">
        {/* Top bar */}
        <div className="w-full bg-transparent border-b border-gray-200 container mx-auto px-6 lg:px-8 flex items-center justify-between h-10 text-sm">
          <span className="text-secondary font-Source">NATURAL, ORIGINAL, ROAST, ANYWHERE.</span>
          <span className="text-secondary font-Source">CALL US: 079 881 1779</span>
          <span className="text-secondary font-Source hidden lg:block">
            ADDRESS: 85 DOAN TRAN NGHIEP, VIETNAM
          </span>
        </div>

        {/* Main navbar */}
        <div className="container mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          <img src={logo} alt="Nora Coffee" className="h-14" />

          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-Source text-lg text-secondary hover:text-orange-600 transition font-medium"
              >
                {item.title}
              </button>
            ))}

            <IoSearchOutline className="text-2xl text-secondary hover:text-orange-600 cursor-pointer transition" />

            {isLoggedIn ? (
              <div className="flex items-center gap-4 pl-8 border-l">
                <span className="text-gray-800">
                  Hi,{" "}
                  <span className="font-bold text-orange-600">
                    {currentUser?.displayName || currentUser?.email?.split("@")[0] || "Khách"}
                  </span>
                  !
                </span>
                <button onClick={handleLogout} className="text-sm underline hover:text-orange-600 transition">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
              >
                Đăng nhập
              </button>
            )}
          </div>

          <div className="lg:hidden">
            <IoMenuOutline className="text-3xl text-secondary cursor-pointer" />
          </div>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Navbar;