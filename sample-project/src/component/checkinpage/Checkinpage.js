import React, { useRef,useState  } from "react";
import { ref, uploadString } from "firebase/storage";
import { storage } from "../../firebase/firebase.config";

const Checkinpage = () => {
  const videoRef = useRef();
  const [mediaStream, setMediaStream] = useState(null);

  const capturePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setMediaStream(stream); // Store the media stream in state
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const takePhoto = async () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg");

    try {
      const storageRef = ref(storage, `photos/${Date.now()}.jpg`);
      await uploadString(storageRef, dataUrl, "data_url");
      console.log("Photo uploaded to Firebase Storage");
    } catch (error) {
      console.error("Error uploading photo to Firebase Storage:", error);
    }
  };

  const closeCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop()); // Stop all tracks in the media stream
      setMediaStream(null); // Clear media stream from state
      videoRef.current.srcObject = null; // Stop video display
    }
  };

  return (
    <div>
      <div className="text-center align-middle mt-10">
        <button onClick={capturePhoto} className="text-center text-lg font-semibold border-2 h-16 w-44 hover:bg-blue-200 rounded-xl border-zinc-300">Open Camera</button>
        <button onClick={closeCamera} className="text-center ml-4 text-lg font-semibold border-2 h-16 w-44 hover:bg-blue-200 rounded-xl border-zinc-300">Close Camera</button>
      </div>
      <div>
        <button onClick={takePhoto} className="text-center ml-8 text-lg font-semibold border-2 h-16 w-44 hover:bg-blue-200 rounded-xl border-zinc-300" >Take Selfie</button>
      </div>
      <video className="rounded-xl ml-10" ref={videoRef} autoPlay style={{ display: "block", width: "100%", maxWidth: "900px" }}></video>
    </div>
  );
};
 

export default Checkinpage;
