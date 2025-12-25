// src/components/Reservation.tsx
import reservation from "../assets/images/reservation.png";
import Button from "./Button";
import { useReservationStore } from "../store/useReservationStore";
import { motion } from "framer-motion";

const Reservation = () => {
  const { form, isSubmitting, setField, submit } = useReservationStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.date || !form.time) {
      alert("Please fill in all the information!");
      return;
    }
    submit();
  };

  return (
    // THÊM id="reservation" + các class để tiêu đề nằm chính giữa màn hình
    <section
      id="reservation"
      className="w-full py-32 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#faf9f7]"
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex lg:flex-row flex-col items-stretch gap-12 lg:gap-20">
          {/* Ảnh bên trái */}
          <div className="lg:w-1/2 w-full">
            <img
              src={reservation}
              alt="Nora Coffee Roastery"
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
            />
          </div>

          {/* Form bên phải */}
          <div className="lg:w-1/2 w-full flex items-center">
            <div className="w-full max-w-md">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-Bebas text-[80px] lg:text-[100px] leading-none tracking-wider text-text mb-6"
              >
                RESERVATION
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg font-light text-secondary mb-12"
              >
                Reserve your table in advance to secure your favorite spot.
              </motion.p>

              <form onSubmit={handleSubmit} className="space-y-10">
                <input
                  type="text"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  aria-label="Họ và tên"
                  className="w-full border-0 border-b-2 border-gray-300 pb-3 bg-transparent outline-none text-lg focus:border-orange-500 transition"
                  required
                />

                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setField("date", e.target.value)}
                  aria-label="Ngày đặt bàn"
                  className="w-full border-0 border-b-2 border-gray-300 pb-3 bg-transparent outline-none text-lg focus:border-orange-500 transition"
                  required
                />

                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => setField("time", e.target.value)}
                  aria-label="Giờ đặt bàn"
                  className="w-full border-0 border-b-2 border-gray-300 pb-3 bg-transparent outline-none text-lg focus:border-orange-500 transition"
                  required
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-8 disabled:opacity-70"
                >
                  {isSubmitting ? "Đang gửi..." : "Find a Table"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;