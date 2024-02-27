import React, { useRef, useState, useEffect } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase/firebase.config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { FaCamera, FaCameraRetro, FaTimes } from "react-icons/fa";
import { storage } from "../../firebase/firebase.config";
import { useAuth } from "../auth/AuthContext"; // Assuming you have an AuthContext for managing user authentication

const Checkinpage = () => {
  const videoRef = useRef();
  const [imageData, setImageData] = useState([]);
  const [cameraOpen, setCameraOpen] = useState(false);
  const { currentUser } = useAuth(); // Assuming you have a currentUser object from your AuthContext

  const fetchData = async () => {
    try {
      const userRef = collection(db, "user");
      const userQuery = query(userRef, where("email", "==", currentUser.email));
      const userSnapshot = await getDocs(userQuery);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        const userName = userData.userName;

        const querySnapshot = await getDocs(collection(db, "datesCollection"));
        const dateData = [];
        querySnapshot.forEach((doc) => {
          dateData.push({ id: doc.id, date: doc.data().date });
        });

        const formattedDateData = dateData.map(item => {
          const formattedDate = new Date(item.date.seconds * 1000 + item.date.nanoseconds / 1000000).toLocaleString();
          return { ...item, formattedDate: formattedDate };
        });

        setImageData(formattedDateData.map(item => ({ ...item, userName })));
      } else {
        console.log("No user data found for current user");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream;
      setCameraOpen(true);
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
      await addDoc(collection(db, "datesCollection"), { date: serverTimestamp() });
      console.log("Photo uploaded and date stored successfully");
    } catch (error) {
      console.error("Error uploading photo and storing date:", error);
    }
  };


  const closeCamera = () => {
    setCameraOpen(false);
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });
    videoRef.current.srcObject = null;
  };

  return (
    <div className="lg:ml-76 mt-24 flex justify-center items-center w-full">
      <div className="">
        <div className="max-w-full overflow-hidden">
          <div className="flex mt-10">
            <h2 className="text-3xl font-semibold mb-2 text-cyan-100 pb-6">
              Employee Checkin
            </h2>
          </div>
          <div className="shadow-md rounded-lg overflow-hidden">
          <div className=" pt-4">
          <button onClick={fetchData}>Fetch Data</button>
        </div>
            <table className="w-full ">
              <thead className="border-2 border-cyan-300">
                <tr>
                  <th className="py-2 px-6">Date</th>
                  <th className="py-2 px-6">Username</th>
                </tr>
                
              </thead>
            
              <tbody>
          {imageData.map(item => (
            <tr key={item.id} >
              <td className="p-6  text-lg ">{item.formattedDate}</td>
              <td className=" pl-10 text-2xl">{item.userName}</td>
            </tr>
          ))}
        </tbody>
            </table>
          </div>
        </div>

        
        <div>
          <div className="text-end align-end mt-10 mr-10">
            <button
              onClick={startVideo}
              className="icon-button aling-center rounded-xl"
            >
              <FaCamera className="text-3xl text-cyan-100 text-center" />
            </button>
          </div>
          <div className="relative text-end">
            <video
              className="rounded-xl ml-10"
              ref={videoRef}
              autoPlay
              style={{
                display: cameraOpen ? "block" : "none",
                width: "100%",
                maxWidth: "900px",
              }}
            />
            {cameraOpen && (
              <div className="m- z-10 flex justify-around">
                <button onClick={takePhoto} className="icon-button">
                  <FaCameraRetro className="text-3xl" />
                </button>
                <div className="mt-">
                  <button onClick={closeCamera} className="icon-button">
                    <FaTimes className="text-3xl" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkinpage;

// import React, { useRef, useEffect } from "react";
// import { ref, uploadString } from "firebase/storage";
// import { storage } from "../../firebase/firebase.config";
// import * as faceapi from "face-api.js";

// const Checkinpage = () => {
//   const videoRef = useRef();

//   useEffect(() => {
//     const loadModelsAndStartVideo = async () => {
//       try {
//         // Load the TinyFaceDetector model
//         await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//         // Load additional models if needed (e.g., face landmark detection)
//         await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
//         await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

//         // Start the video stream after models are loaded
//         startVideo();
//       } catch (error) {
//         console.error("Error loading models:", error);
//       }
//     };

//     loadModelsAndStartVideo();
//   }, []);

//   const startVideo = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
//       videoRef.current.srcObject = stream;
//       // Wait for video to be fully loaded
//       videoRef.current.onloadedmetadata = () => {
//         // Start face detection after video has loaded
//         detectFaces();
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const detectFaces = async () => {
//     try {
//       const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//       const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
//       faceapi.matchDimensions(canvas, displaySize);
//       setInterval(async () => {
//         const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);
//         canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         const imageData = canvas.toDataURL("image/jpeg");

//         // Upload photo to Firebase Storage
//         const storageRef = ref(storage, photos/${Date.now()}.jpg);
//         await uploadString(storageRef, imageData, "data_url");
//         console.log("Photo uploaded to Firebase Storage");
//       }, 1000); // Adjust interval as needed
//     } catch (error) {
//       console.error("Error detecting faces:", error);
//     }
//   };

//   const handleOpenCamera = () => {
//     startVideo();
//   };

//   return (
//     <div>
//       <button onClick={handleOpenCamera} className="text-center text-lg font-semibold border-2 h-16 w-44 hover:bg-blue-200 rounded-xl border-zinc-300">Open Camera</button>
//       <video className="rounded-xl ml-10" ref={videoRef} autoPlay />
//     </div>
//   );
// };

// export default Checkinpage;

// import React, { useRef, useEffect } from "react";
// import { ref, uploadString } from "firebase/storage";
// import { storage } from "../../firebase/firebase.config";
// import * as faceapi from "face-api.js";

// const Checkinpage = () => {
//   const videoRef = useRef();

//   useEffect(() => {
//     const loadModelsAndStartVideo = async () => {
//       try {
//         // Load the TinyFaceDetector model
//         await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
//         // Load additional models if needed (e.g., face landmark detection)
//         await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
//         await faceapi.nets.faceRecognitionNet.loadFromUri("/models");

//         // Start the video stream after models are loaded
//         startVideo();
//       } catch (error) {
//         console.error("Error loading models:", error);
//       }
//     };

//     loadModelsAndStartVideo();
//   }, []);

//   const startVideo = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
//       videoRef.current.srcObject = stream;
//       // Wait for video to be fully loaded
//       videoRef.current.onloadedmetadata = () => {
//         // Start face detection after video has loaded
//         detectFaces();
//       };
//     } catch (error) {
//       console.error("Error accessing camera:", error);
//     }
//   };

//   const detectFaces = async () => {
//     try {
//       const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//       const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
//       faceapi.matchDimensions(canvas, displaySize);
//       setInterval(async () => {
//         const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
//         const resizedDetections = faceapi.resizeResults(detections, displaySize);
//         canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
//         faceapi.draw.drawDetections(canvas, resizedDetections);
//         const imageData = canvas.toDataURL("image/jpeg");

//         // Upload photo to Firebase Storage
//         const storageRef = ref(storage, `photos/${Date.now()}.jpg`);
//         await uploadString(storageRef, imageData, "data_url");
//         console.log("Photo uploaded to Firebase Storage");
//       }, 1000); // Adjust interval as needed
//     } catch (error) {
//       console.error("Error detecting faces:", error);
//     }
//   };

//   const handleOpenCamera = () => {
//     startVideo();
//   };

//   return (
//     <div>
//       <button onClick={handleOpenCamera} className="text-center text-lg font-semibold border-2 h-16 w-44 hover:bg-blue-200 rounded-xl border-zinc-300">Open Camera</button>
//       <video className="rounded-xl ml-10" ref={videoRef} autoPlay />
//     </div>
//   );
// };

// export default Checkinpage;

// import React, { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../../firebase/firebase.config'; // Import your Firebase configuration

// const Checkinpage = () => {
//   const [username, setUsername] = useState('');
//   const [showUsernameModal, setShowUsernameModal] = useState(true);
//   const [showWebcamModal, setShowWebcamModal] = useState(false);
//   const [webcamStream, setWebcamStream] = useState(null);
//   const [capturedImage, setCapturedImage] = useState('');

//   // Function to handle capturing the photo
//   const capturePhoto = () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = webcamStream.videoWidth;
//     canvas.height = webcamStream.videoHeight;
//     canvas.getContext('2d').drawImage(webcamStream, 0, 0);
//     const imageData = canvas.toDataURL('image/jpeg');
//     setCapturedImage(imageData);
//     // Stop the webcam stream
//     webcamStream.getTracks().forEach(track => track.stop());
//     setShowWebcamModal(false);
//     // Save the photo to Firebase
//     savePhoto(imageData);
//   };

//   // Function to save the captured photo to Firebase
//   const savePhoto = async (imageData) => {
//     try {
//       await addDoc(collection(db, 'photos'), { username, photo: imageData });
//       console.log('Photo saved successfully!');
//     } catch (error) {
//       console.error('Error saving photo:', error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       {showUsernameModal && (
//         <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded-lg">
//             <label className="block mb-4">Enter your username:</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="border border-gray-300 rounded-lg px-4 py-2 mb-4"
//             />
//             <button
//               onClick={() => setShowWebcamModal(true)}
//               disabled={!username}
//               className={`bg-blue-500 text-white rounded-lg px-4 py-2 ${!username && 'opacity-50 cursor-not-allowed'}`}
//             >
//               Start Webcam
//             </button>
//           </div>
//         </div>
//       )}

// {showWebcamModal && (
//   <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
//     <div className="bg-white p-8 rounded-lg">
//       <video
//         ref={(video) => {
//           if (video && video.srcObject === null) {
//             video.srcObject = webcamStream;
//           }
//         }}
//         autoPlay
//         playsInline
//         className="w-full rounded-lg mb-4"
//       />
//       <button onClick={capturePhoto} className="bg-blue-500 text-white rounded-lg px-4 py-2">Capture Photo</button>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default Checkinpage;
