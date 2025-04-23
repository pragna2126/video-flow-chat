
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// This will be replaced with actual videos provided by the user
// For now we'll use placeholders
const placeholderVideos = [
  "/video1.mp4",
  "/video2.mp4",
  "/video3.mp4",
  "/video4.mp4",
  "/video5.mp4",
  "/video6.mp4"
];

const VideoBackground = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Initialize video refs
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, placeholderVideos.length);
  }, []);

  // Handle video rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => 
        (prevIndex + 1) % placeholderVideos.length
      );
    }, 3000); // 3 seconds per video

    return () => clearInterval(interval);
  }, []);

  // Preload videos and handle playback
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.play().catch(err => console.error("Video play error:", err));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentVideoIndex]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
      {placeholderVideos.map((src, index) => (
        <AnimatePresence key={src}>
          {currentVideoIndex === index && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <video
                ref={el => videoRefs.current[index] = el}
                className="w-full h-full object-cover"
                src={src}
                muted
                playsInline
                preload="auto"
              />
            </motion.div>
          )}
        </AnimatePresence>
      ))}
      {/* Add an overlay for better visibility of chat elements */}
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
};

export default VideoBackground;
