
import VideoBackground from "@/components/VideoBackground";
import ChatUI from "@/components/ChatUI";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <VideoBackground />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          AI Powered Fit
        </h1>
        <ChatUI />
      </div>
    </div>
  );
};

export default Index;
