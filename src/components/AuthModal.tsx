// src/components/AuthModal.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, googleProvider } from "../lib/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  AuthError,
} from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { X, Mail, Lock, User, AlertCircle, ChevronDown } from "lucide-react";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; terms?: string }>({});
  const [showScrollHint, setShowScrollHint] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef = useRef<HTMLInputElement>(null);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!form.email) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email không hợp lệ";

    if (!form.password) newErrors.password = "Vui lòng nhập mật khẩu";
    else if (form.password.length < 8) newErrors.password = "Mật khẩu phải từ 8 ký tự trở lên";

    if (!isLogin) {
      if (!form.confirmPassword) newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
      else if (form.confirmPassword !== form.password) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
      if (!form.name) newErrors.password = "Vui lòng nhập họ tên";
      if (!agreeTerms) newErrors.terms = "Bạn phải đồng ý với điều khoản sử dụng";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Tự động focus + Enter chuyển trường
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, nextRef?: React.RefObject<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  // Kiểm tra chiều cao form để hiện scroll hint
  useEffect(() => {
    if (formRef.current) {
      const formHeight = formRef.current.scrollHeight;
      const viewportHeight = window.innerHeight * 0.8; // 80% màn hình
      setShowScrollHint(formHeight > viewportHeight);
    }
  }, [isLogin]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
        toast.success("Đăng nhập thành công! Chào mừng quay lại Nora!", { icon: "🎉" });
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
        toast.success(`Đăng ký thành công! Chào mừng ${form.name || form.email.split("@")[0]}!`, { icon: "🎉" });
        toast("Chúng tôi đã gửi email xác thực đến hộp thư của bạn!", { icon: "📧" });
      }
      onClose();
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      setAgreeTerms(false);
    } catch (_err) {
      const err = _err as AuthError;
      let msg = "Có lỗi xảy ra, vui lòng thử lại!";
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        msg = "Email hoặc mật khẩu không đúng!";
      } else if (err.code === "auth/email-already-in-use") {
        msg = "Email này đã được sử dụng!";
      } else if (err.code === "auth/weak-password") {
        msg = "Mật khẩu phải có ít nhất 6 ký tự!";
      }
      toast.error(msg, { icon: "😓" });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Đăng nhập bằng Google thành công!", { icon: "🎉" });
      onClose();
    } catch (_err) {
      toast.error("Đăng nhập Google thất bại! Vui lòng thử lại.", { icon: "😓" });
    }
  };

  const handleForgotPassword = () => {
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Vui lòng nhập email hợp lệ để khôi phục mật khẩu!", { icon: "⚠️" });
      return;
    }
    sendPasswordResetEmail(auth, form.email)
      .then(() => toast.success("Đã gửi link khôi phục đến email của bạn!", { icon: "📧" }))
      .catch(() => toast.error("Không thể gửi email khôi phục!"));
  };

  return (
    <>
      <Toaster position="top-right" />

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md my-8 relative">
                {/* Scroll hint – chỉ hiện khi form dài */}
                <AnimatePresence>
                  {showScrollHint && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
                    >
                      <ChevronDown className="w-8 h-8 text-orange-600 animate-bounce" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-center p-6 border-b">
                  <div>
                    <h2 className="font-Bebas text-4xl lg:text-5xl tracking-wider text-gray-900">
                      {isLogin ? "WELCOME BACK" : "JOIN NORA"}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm lg:text-base">
                      {isLogin ? "Đăng nhập để đặt bàn nhanh hơn" : "Tạo tài khoản miễn phí"}
                    </p>
                  </div>
                  <button type="button" onClick={onClose} aria-label="Đóng modal" className="p-2 hover:bg-gray-100 rounded-full transition">
                    <X size={24} className="text-gray-500" />
                  </button>
                </div>

                <form ref={formRef} onSubmit={handleEmailAuth} className="p-6 lg:p-8 space-y-5">
                  {!isLogin && (
                    <div className="relative">
                      <User className="absolute left-4 top-4 text-gray-400" size={20} />
                      <input
                        ref={nameRef}
                        type="text"
                        placeholder="Họ & tên"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onKeyDown={(e) => handleKeyDown(e, emailRef)}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 outline-none transition text-base"
                      />
                      <p className="text-xs text-gray-500 mt-1">Tên sẽ hiển thị khi đặt bàn</p>
                    </div>
                  )}

                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
                    <input
                      ref={emailRef}
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:border-orange-500 outline-none transition text-base ${errors.email ? "border-red-500" : "border-gray-200"}`}
                      required
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.email}</p>}
                    <p className="text-xs text-gray-500 mt-1">Ví dụ: ten@gmail.com</p>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                    <input
                      ref={passwordRef}
                      type="password"
                      placeholder="Mật khẩu"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      onKeyDown={(e) => !isLogin && handleKeyDown(e, confirmRef)}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:border-orange-500 outline-none transition text-base ${errors.password ? "border-red-500" : "border-gray-200"}`}
                      required
                    />
                    {errors.password && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.password}</p>}
                    <p className="text-xs text-gray-500 mt-1">Mật khẩu từ 8 ký tự trở lên</p>
                  </div>

                  {!isLogin && (
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                      <input
                        ref={confirmRef}
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl focus:border-orange-500 outline-none transition text-base ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}`}
                        required
                      />
                      {errors.confirmPassword && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle size={14} /> {errors.confirmPassword}</p>}
                    </div>
                  )}

                  {!isLogin && (
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                        title="Đồng ý với Điều khoản sử dụng và Chính sách bảo mật"
                        required
                      />
                      <label className="text-sm text-gray-700">
                        Tôi đồng ý với{" "}
                        <a href="/terms" target="_blank" className="text-orange-600 hover:underline font-medium">
                          Điều khoản sử dụng
                        </a>{" "}
                        và{" "}
                        <a href="/privacy" target="_blank" className="text-orange-600 hover:underline font-medium">
                          Chính sách bảo mật
                        </a>
                      </label>
                    </div>
                  )}
                  {errors.terms && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={14} /> {errors.terms}</p>}

                  {isLogin && (
                    <div className="text-right">
                      <button type="button" onClick={handleForgotPassword} className="text-sm text-orange-600 hover:underline font-medium">
                        Quên mật khẩu?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg rounded-2xl transition shadow-lg hover:shadow-xl uppercase tracking-wider"
                  >
                    {isLogin ? "Đăng nhập" : "Đăng ký ngay"}
                  </button>

                  <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Hoặc tiếp tục với</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    aria-label="Đăng nhập bằng Google"
                    className="w-full flex items-center justify-center gap-3 py-4 border-2 border-gray-300 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="" className="w-5 h-5" />
                    <span className="font-medium">Google</span>
                  </button>

                  <p className="text-center text-gray-600 pt-4 pb-4">
                    {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
                    <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-orange-600 font-bold hover:underline">
                      {isLogin ? "Đăng ký miễn phí" : "Đăng nhập"}
                    </button>
                  </p>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}