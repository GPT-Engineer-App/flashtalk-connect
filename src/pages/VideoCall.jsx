import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Mic, PhoneOff, Video } from 'lucide-react';
import { useClient, useMicrophoneAndCameraTracks, channelName } from '../lib/agora';
import AgoraRTC from "agora-rtc-sdk-ng";

const VideoCall = () => {
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(process.env.REACT_APP_AGORA_APP_ID, name, null, null);
        if (tracks) await client.publish([tracks[0], tracks[1]]);
        setStart(true);
      } catch (error) {
        console.log("error", error);
      }
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }

  }, [channelName, client, ready, tracks]);

  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const toggleCamera = async () => {
    if (tracks[1]) {
      await tracks[1].setEnabled(!isCameraOn);
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMic = async () => {
    if (tracks[0]) {
      await tracks[0].setEnabled(!isMicOn);
      setIsMicOn(!isMicOn);
    }
  };

  const endCall = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setUsers([]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow bg-gray-900 relative">
        {start && tracks && (
          <div className="absolute inset-0">
            <div id="videos" className="grid grid-cols-2 gap-4 h-full">
              <AgoraVideoPlayer videoTrack={tracks[1]} style={{height: '100%', width: '100%'}} />
              {users.length > 0 &&
                users.map((user) => {
                  if (user.videoTrack) {
                    return (
                      <AgoraVideoPlayer videoTrack={user.videoTrack} key={user.uid} style={{height: '100%', width: '100%'}} />
                    );
                  } else return null;
                })}
            </div>
          </div>
        )}
      </div>
      <div className="bg-gray-800 p-4 flex justify-center space-x-4">
        <Button onClick={toggleCamera} variant={isCameraOn ? "default" : "secondary"}>
          <Camera className="h-6 w-6" />
        </Button>
        <Button onClick={toggleMic} variant={isMicOn ? "default" : "secondary"}>
          <Mic className="h-6 w-6" />
        </Button>
        <Button onClick={endCall} variant="destructive">
          <PhoneOff className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default VideoCall;
