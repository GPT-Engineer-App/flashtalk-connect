import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Mic, PhoneOff, Video } from 'lucide-react';

const VideoCall = () => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  useEffect(() => {
    // Here you would initialize your video call SDK
    // For example: initializeVideoCall();
  }, []);

  const toggleCamera = () => setIsCameraOn(!isCameraOn);
  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const endCall = () => {
    // Here you would implement the logic to end the call
    console.log('Ending call');
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow bg-gray-900 relative">
        {/* Video streams would be rendered here */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-white text-2xl">Video Call in Progress</p>
        </div>
      </div>
      <div className="bg-gray-800 p-4 flex justify-center space-x-4">
        <Button onClick={toggleCamera} variant={isCameraOn ? "default" : "secondary"}>
          <Camera className="h-6 w-6" />
        </Button>
        <Button onClick={toggleMic} variant={isMicOn ? "default" : "secondary"}>
          <Mic className="h-6 w-6" />
        </Button>
        <Button onClick={toggleVideo} variant={isVideoOn ? "default" : "secondary"}>
          <Video className="h-6 w-6" />
        </Button>
        <Button onClick={endCall} variant="destructive">
          <PhoneOff className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default VideoCall;
