
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.error("Video play error:", err));
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="https://media.istockphoto.com/id/824186510/video/below-view-of-athletic-people-jogging-on-treadmills-in-a-gym-slow-motion.mp4"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        />
        {/* Dark overlay for better readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </motion.div>
    </div>
  );
};

export default VideoBackground;
