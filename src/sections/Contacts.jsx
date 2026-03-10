import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import MagneticButton from "../components/MagneticButton";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    shootConfetti();
    setTimeout(() => {
      setSent(false);
      setFormData({ name: "", email: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-black text-white overflow-hidden">
      <div className="w-full flex justify-center mb-8">
        <MagneticButton className="mt-8 px-6 py-3 bg-pink-500 rounded-full text-white font-semibold shadow-md hover:shadow-pink-400/50">
          Let's Connect
        </MagneticButton>
      </div>

      <Motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-8 border border-white/5"
      >
        {/* Floating-label input fields */}
        {[
          { name: "name", type: "text", label: "Name" },
          { name: "email", type: "email", label: "Email" },
        ].map((field, idx) => (
          <Motion.div key={field.name} className="relative"
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + idx * 0.15, duration: 0.5 }}
          >
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              required
              placeholder=" "
              onChange={handleChange}
              className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300"
            />
            <label className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm pointer-events-none transition-all duration-300 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
            >{field.label}</label>
          </Motion.div>
        ))}

        <Motion.div className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <textarea
            name="message"
            value={formData.message}
            required
            rows={4}
            placeholder=" "
            onChange={handleChange}
            className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_15px_rgba(234,179,8,0.12)] transition-all duration-300 resize-none"
          />
          <label className="absolute left-4 top-4 text-white/40 text-sm pointer-events-none transition-all duration-300 peer-focus:top-1 peer-focus:text-xs peer-focus:text-yellow-400 peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
          >Message</label>
        </Motion.div>

        <Motion.button
          type="submit"
          whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(168,85,247,0.35)" }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-400 transition-all duration-300 shadow-lg relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <Motion.span key="sent" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                className="inline-block">🎉 Message Sent!</Motion.span>
            ) : (
              <Motion.span key="send" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                className="inline-block">Send Message</Motion.span>
            )}
          </AnimatePresence>
        </Motion.button>
      </Motion.form>
    </section>
  );
};

export default Contact;
