
import VideoBackground from "@/components/VideoBackground";
import ChatUI from "@/components/ChatUI";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <VideoBackground />
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <ChatUI />
      </div>
    </div>
  );
};

export default Index;
