import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
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
    <section id="contact" className="py-24 px-6 bg-black text-white">
      <div className="w-full flex justify-center mb-8">
        <MagneticButton className="mt-8 px-6 py-3 bg-pink-500 rounded-full text-white font-semibold shadow-md hover:shadow-pink-400/50">
          Let’s Connect
        </MagneticButton>
      </div>

      <Motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6"
      >
        {/* Input Fields */}
        <div>
          <label className="block mb-1 text-sm text-cyan-300">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            placeholder="Your name"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-black border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-pink-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            required
            placeholder="you@email.com"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-black border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-yellow-300">Message</label>
          <textarea
            name="message"
            value={formData.message}
            required
            rows={4}
            placeholder="What’s on your mind?"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-black border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-md font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:scale-105"
        >
          {sent ? "🎉 Message Sent!" : "Send Message"}
        </button>
      </Motion.form>
    </section>
  );
};

export default Contact;
