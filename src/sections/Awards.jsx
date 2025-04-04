import { useEffect, useRef, useState } from "react";
import { motion as Motion} from "framer-motion";
import Tilt from "react-parallax-tilt";
import confetti from "canvas-confetti";

const awards = [
  {
    title: "TechGiG Times Internet - Rank 2",
    issuer: "TechGig",
    year: "2022",
    icon: "🚀",
    certificate: "https://media.licdn.com/dms/image/v2/C4D22AQF3jY22F3t-TA/feedshare-shrink_1280/feedshare-shrink_1280/0/1641485336518?e=1746662400&v=beta&t=la6XX4Liv_rluyZe3cHMp_csCNBXZLgMJhBwt510DUg",
  },
  {
    title: "5⭐ Gold Badge - Python",
    issuer: "HackerRank",
    year: "2020",
    icon: "🐍",
    certificate: "https://www.hackerrank.com/profile/ledgemen",
  },
  {
    title: "TechGig Code Gladiators - Semi Finalist",
    issuer: "TechGig",
    year: "2020",
    icon: "🏆",
    certificate: "https://drive.google.com/file/d/1JNPSsUjFWugkMJK9wPw4wK19PfZqlTIY/view?usp=sharing",
  },
  {
    title: "Google Code Jam - Qualifier",
    issuer: "Google",
    year: "2018 & 2019",
    icon: "🏆",
    certificate: "https://drive.google.com/file/d/17K_MA36xXau28e6RI3UrZUu_aPSc0DFG/view",
  },
  {
    title: "NPTEL - Database Systems",
    issuer: "IIT Kharagpur",
    year: "2017",
    icon: "🎓",
    certificate: "/certificates/nptel-dbms.png",
  },
];

const Awards = () => {
  const sectionRef = useRef(null);
  const [hasCelebrated, setHasCelebrated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCelebrated) {
          confetti({ particleCount: 100, spread: 100 });
          setHasCelebrated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasCelebrated]);

  return (
    <section
      id="awards"
      className="py-28 px-6 bg-[#0f172a] text-white relative"
      ref={sectionRef}
    >
      <Motion.h2
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-fuchsia-400 to-yellow-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🏅 Awards & Certifications
      </Motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {awards.map((award, i) => (
          <Motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
              <div
                className="bg-[#1e293b] p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all cursor-pointer"
                onClick={() => award.certificate && window.open(award.certificate, "_blank")}
              >
                <div className="text-5xl mb-4">{award.icon}</div>
                <h3 className="text-xl font-semibold">{award.title}</h3>
                <p className="text-sm text-white/70">{award.issuer}</p>
                <p className="text-xs mt-1 text-white/50">{award.year}</p>
              </div>
            </Tilt>
          </Motion.div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
