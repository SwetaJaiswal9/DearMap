import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import mapImg from "../assets/mapImg.svg";
import cloud from "../assets/cloud.png";

const FloatingCloud = ({ top, left, size, delay }) => (
  <motion.img
    src={cloud}
    alt="Cloud"
    className="absolute opacity-60"
    style={{ top: `${top}%`, left: `${left}%`, width: size }}
    animate={{ x: [0, 40, 0] }}
    transition={{ duration: 25, repeat: Infinity, delay }}
  />
);

const Hero = ({ onStart }) => {
  return (
    <div className="h-[92vh] flex flex-col-reverse md:flex-row bg-gradient-to-br from-rose-50 via-white to-emerald-100 relative overflow-hidden">
      
      <FloatingCloud top={5} left={5} size={"180px"} delay={0} />
      <FloatingCloud top={12} left={32} size={"260px"} delay={2} />
      <FloatingCloud top={10} left={78} size={"140px"} delay={1} />
      <FloatingCloud top={40} left={48} size={"110px"} delay={3} />

      <div className="flex-1 flex flex-col justify-center items-center md:items-start px-10 py-20 z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-rose-400 drop-shadow-md text-center md:text-left"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Map Your Memories
        </motion.h1>

        <motion.p
          className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 font-medium max-w-md text-center md:text-left"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Drop your laughter, love, and longing on the map of your life.
        </motion.p>

        <motion.button
          onClick={onStart}
          className="mt-6 sm:mt-8 bg-rose-400 text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2 shadow-md hover:bg-rose-500 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Mapping <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="flex-1 flex justify-center items-center px-10 py-10 relative z-10">
        <motion.img
          src={mapImg}
          alt="Floating Map"
          className="w-[90%] max-w-[300px] sm:max-w-md"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Chevron (hidden on small devices) */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 hidden md:flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        onClick={onStart}
      >
        <ChevronDown className="w-12 h-12 sm:w-16 sm:h-16 text-rose-400" />
      </motion.div>
    </div>
  );
};

export default Hero;
