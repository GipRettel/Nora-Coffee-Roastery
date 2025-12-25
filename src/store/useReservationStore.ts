// src/store/useReservationStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Form = {
  name: string;
  date: string;
  time: string;
};

export const useReservationStore = create<{
  form: Form;
  isSubmitting: boolean;
  setField: (field: keyof Form, value: string) => void;
  submit: () => Promise<void>;
  reset: () => void;
}>()(
  immer((set, get) => ({
    form: { name: "", date: "", time: "" },
    isSubmitting: false,

    setField: (field, value) =>
      set((state) => {
        state.form[field] = value;
      }),

    reset: () =>
      set({
        form: { name: "", date: "", time: "" },
        isSubmitting: false,
      }),

    submit: async () => {
      set({ isSubmitting: true });
      await new Promise((r) => setTimeout(r, 1200));
      alert(`Cảm ơn ${get().form.name}! Bàn đã được đặt thành công!`);
      get().reset();
      set({ isSubmitting: false });
    },
  }))
);