import { useEffect } from "react";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.min.css";
import { motion as Motion } from "framer-motion"

const testimonials = [
  {
    quote:
      "Ayush is one of the rare programmers I have ever seen, you can bet on him whenever you have a difficult problem statement to be solved in a tight timeline.",
    name: "Subhanshu Jha",
    title: "Tech Lead, Psych x86",
  },
  {
    quote: "Creative, passionate, and always on time. A joy to work with!",
    name: "Neha Verma",
    title: "Product Designer, Xwola",
  },
  {
    quote: "His attention to detail and motion UI is unmatched.",
    name: "Vineeta V.",
    title: "Recruiter, IBM GOC",
  },
];

const TestimonialSlider = () => {
  useEffect(() => {
    const slider = new Glide(".glide", {
      type: "carousel",
      autoplay: 4000,
      hoverpause: true,
      perView: 1,
      animationDuration: 1000,
      gap: 30,
    });

    slider.mount();

    return () => slider.destroy(); // Clean up
  }, []);

  return (
    <section className="py-24 px-6 bg-[#1e293b] text-white" id="testimonials">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-cyan-400 text-transparent bg-clip-text">
        🧠 Words from Collaborators
      </h2>

      <div className="glide w-full max-w-3xl mx-auto">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {testimonials.map((t, i) => (
              <li key={i} className="glide__slide flex justify-center">
                <Motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-[#0f172a] p-8 rounded-3xl shadow-xl border border-white/10 text-center w-full max-w-lg"
                >
                  <p className="text-white/90 italic mb-6 text-lg">
                    “{t.quote}”
                  </p>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-sm text-white/50">{t.title}</p>
                </Motion.div>
              </li>
            ))}
          </ul>
        </div>

        {/* Arrows */}
        <div
          className="flex justify-center gap-4 mt-6"
          data-glide-el="controls"
        >
          <button data-glide-dir="<" className="text-white text-2xl">
            ←
          </button>
          <button data-glide-dir=">" className="text-white text-2xl">
            →
          </button>
        </div>

        {/* Dots */}
        <div
          className="flex justify-center gap-2 mt-4"
          data-glide-el="controls[nav]"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              className="w-3 h-3 rounded-full bg-white/30 hover:bg-white"
              data-glide-dir={`=${index}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
