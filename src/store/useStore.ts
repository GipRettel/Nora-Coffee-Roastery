// src/store/useStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  // Reservation form
  reservation: {
    people: string;
    date: string;
    time: string;
  };

  // Mobile menu
  isMenuOpen: boolean;

  // Cart (nếu sau này bán bean online)
  cart: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
};

type Actions = {
  setReservation: (data: Partial<State["reservation"]>) => void;
  resetReservation: () => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  addToCart: (item: { id: string; name: string; price: number }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

export const useStore = create<State & Actions>()(
  immer((set) => ({
    // Initial state
    reservation: {
      people: "",
      date: "",
      time: "",
    },
    isMenuOpen: false,
    cart: [],

    // Actions – dùng immer nên viết như mutate trực tiếp luôn, siêu gọn!
    setReservation: (data) =>
      set((state) => {
        state.reservation = { ...state.reservation, ...data };
      }),

    resetReservation: () =>
      set((state) => {
        state.reservation = { people: "", date: "", time: "" };
      }),

    toggleMenu: () =>
      set((state) => {
        state.cart.length = 0; // ví dụ: xóa cart khi mở menu (tùy cậu)
        state.isMenuOpen = !state.isMenuOpen;
      }),

    closeMenu: () =>
      set((state) => {
        state.isMenuOpen = false;
      }),

    addToCart: (item) =>
      set((state) => {
        const existing = state.cart.find((i) => i.id === item.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          state.cart.push({ ...item, quantity: 1 });
        }
      }),

    removeFromCart: (id) =>
      set((state) => {
        state.cart = state.cart.filter((i) => i.id !== id);
      }),

    clearCart: () =>
      set((state) => {
        state.cart = [];
      }),
  }))
);