import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 via-white to-emerald-100">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-rose-500"
      >
        <MapPin size={60} className="animate-bounce" />
      </motion.div>
      <p className="mt-4 text-lg font-semibold text-gray-600 italic">
        Mapping your moments...
      </p>
    </div>
  );
};

export default LoadingScreen;
