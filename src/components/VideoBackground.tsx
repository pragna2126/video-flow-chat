
import { motion } from "framer-motion";

const VideoBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://i.pinimg.com/736x/6b/06/e8/6b06e8768dc8077e54c35f35eb2a9a93.jpg')"
          }}
        />
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </motion.div>
    </div>
  );
};

export default VideoBackground;
