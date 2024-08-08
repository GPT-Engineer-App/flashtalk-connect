import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "YOUR_AGORA_APP_ID"; // Replace with your Agora app ID
export const useClient = createClient({ mode: "rtc", codec: "vp8" });
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
