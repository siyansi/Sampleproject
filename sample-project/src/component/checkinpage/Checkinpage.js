  import React, { useRef, useState, useEffect } from "react";
  import { ref, uploadString, getDownloadURL } from "firebase/storage";
  import { storage, db } from "../../firebase/firebase.config";
  import { collection, getDocs } from "firebase/firestore";
  import * as faceapi from "face-api.js";
  import { FaCamera, FaCameraRetro, FaTimes } from 'react-icons/fa';

  const Checkinpage = () => {
    const videoRef = useRef();
  
    const [imageData, setImageData] = useState([]); // State to store image data from Firestore
    const [cameraOpen, setCameraOpen] = useState(false); // State to manage camera open/close

    useEffect(() => {
      // Fetch image data from Firestore
      const fetchImageData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "ImageUrl"));
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          setImageData(data);
        } catch (error) {
          console.error("Error fetching image data:", error);
        }
      };

      fetchImageData();
    }, []);

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        videoRef.current.srcObject = stream;
        setCameraOpen(true); // Set cameraOpen state to true when video starts
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
      setCameraOpen(false);
      // Stop video stream
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      // Clear video stream
      videoRef.current.srcObject = null;
    };

    return (
      <div>
        <div className="max-w-full overflow-hidden">
          <div className="flex">
            <h2 className="text-lg font-semibold mb-2">Student Table</h2>
          </div>
          <div className="shadow-md rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">Image</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {imageData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.imageUrl} alt="Student" className="h-12 w-12 rounded-full" />
                    </td>
                    <td>{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="text-end align-end mt-10 mr-10 ">
            <button onClick={startVideo} className="icon-button   aling-center rounded-xl">
              <FaCamera className="text-3xl text-rose-300 text-center" />
            </button>
          </div>
          <div className="relative text-end">
            <video
              className="rounded-xl ml-10"
              ref={videoRef}
              autoPlay
              style={{ display: cameraOpen ? "block" : "none", width: "100%", maxWidth: "900px" }}
            />
            {cameraOpen && (
              <div className=" m- z-10 flex justify-around">
                <button onClick={takePhoto} className="icon-button">
                  <FaCameraRetro className="text-3xl" />
                </button>
                <div className=" mt-">
                  <button onClick={closeCamera} className="icon-button">
                    <FaTimes className="text-3xl" />
                  </button>
                </div>
              </div>
            )}
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

