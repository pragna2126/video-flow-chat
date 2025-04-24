
import VideoBackground from "@/components/VideoBackground";
import ChatUI from "@/components/ChatUI";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <VideoBackground />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          Flirt Fit
        </h1>
        <ChatUI />
      </div>
      <div className="fixed bottom-4 right-4 z-20">
        <iframe 
          src="https://interfaces.zapier.com/embed/chatbot/cm9tzmuxm005b12klbedxuo3o"
          allow="clipboard-write"
          className="w-96 h-[600px] rounded-lg shadow-xl"
        ></iframe>
      </div>
    </div>
  );
};

export default Index;
