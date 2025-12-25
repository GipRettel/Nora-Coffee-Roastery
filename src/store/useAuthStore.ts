// src/store/useAuthStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type User = {
  name: string;
  email: string;
  password: string; // lưu dạng plain (demo thôi, sau này mã hóa)
};

type AuthState = {
  users: User[]; // lưu tất cả user đã đăng ký
  currentUser: User | null;
  isLoggedIn: boolean;
  register: (user: Omit<User, "password"> & { password: string }) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  immer((set, get) => ({
    users: [],
    currentUser: null,
    isLoggedIn: false,

    register: (newUser) => {
      const { users } = get();
      if (users.some(u => u.email === newUser.email)) {
        alert("Email này đã được đăng ký rồi!");
        return false;
      }

      set((state) => {
        state.users.push({ ...newUser });
        state.currentUser = { ...newUser };
        state.isLoggedIn = true;
      });

      // Lưu vào localStorage (demo)
      localStorage.setItem("nora_users", JSON.stringify(get().users));
      localStorage.setItem("nora_current", JSON.stringify(get().currentUser));
      return true;
    },

    login: (email, password) => {
      const { users } = get();
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        alert("Email hoặc mật khẩu không đúng!");
        return false;
      }

      set((state) => {
        state.currentUser = user;
        state.isLoggedIn = true;
      });

      localStorage.setItem("nora_current", JSON.stringify(user));
      return true;
    },

    logout: () => {
      set((state) => {
        state.currentUser = null;
        state.isLoggedIn = false;
      });
      localStorage.removeItem("nora_current");
    },
  }))
);

// Load từ localStorage khi mở trang
const savedUsers = localStorage.getItem("nora_users");
const savedCurrent = localStorage.getItem("nora_current");

if (savedUsers) {
  useAuthStore.setState({ users: JSON.parse(savedUsers) });
}
if (savedCurrent) {
  useAuthStore.setState({ currentUser: JSON.parse(savedCurrent), isLoggedIn: true });
}