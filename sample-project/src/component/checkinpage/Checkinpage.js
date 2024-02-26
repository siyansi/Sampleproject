import React, { useRef, useState, useEffect } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase/firebase.config";
import { collection, addDoc, serverTimestamp, query, getDocs } from "firebase/firestore";
import { FaCamera, FaCameraRetro, FaTimes } from "react-icons/fa";
import { storage } from "../../firebase/firebase.config";

const Checkinpage = () => {
  const videoRef = useRef();
  const [imageData, setImageData] = useState([]); // State to store image data from Firestore
  const [cameraOpen, setCameraOpen] = useState(false); // State to manage camera open/close
  const [modalOpen, setModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };


  const handleSubmit = async () => {
    // Check if userName meets validation criteria
    if (userName.trim() === '') {
        // If userName is empty, display an error message to the user
        alert('Please enter a valid user name.');
        return;
    }

    // Query the database to check if the userName exists
    try {
        // Assuming db is your Firestore database reference
        const querySnapshot = await getDocs(collection(db, 'users'));
        const existingUserNames = querySnapshot.docs.map(doc => doc.data().userName);
        
        if (!existingUserNames.includes(userName)) {
            // If userName doesn't exist in the database, display an error message
            alert('User with the entered name does not exist.');
            return;
        }

        // If userName is valid and exists, proceed to open the camera
        startVideo(true);
        closeModal();
    } catch (error) {
        console.error('Error checking user name:', error);
        // Display an error message to the user (e.g., "Failed to check user name. Please try again.")
    }
};
    // Fetch image data and dates from Firestore
    const fetchData = async () => {
      try {
        // Fetch image URLs from Firebase Storage
        const storageRef = ref(storage, "photos.jpg");
        const imageURL = await getDownloadURL(storageRef);

        // Fetch dates from Firestore
        const querySnapshot = await getDocs(collection(db, "datesCollection"));
        const datesData = [];
        querySnapshot.forEach((doc) => {
          datesData.push({ id: doc.id, date: doc.data().date.toDate().toString() }); // Convert Firestore Timestamp to a string
        });

        // Combine image URLs and dates
        const combinedData = datesData.map((dateItem, index) => ({
          id: index + 1,
          imageUrl: imageURL,
          date: dateItem.date,
        }));

        setImageData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

   

  // Other functions remain the same

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
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `photos/${Date.now()}.jpg`);
      await uploadString(storageRef, dataUrl, "data_url");

      // Store date in Cloud Firestore
      await addDoc(collection(db, "datesCollection"), { date: serverTimestamp() });

      console.log("Photo uploaded and date stored successfully");
    } catch (error) {
      console.error("Error uploading photo and storing date:", error);
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
<div className="lg:ml-80 mt-24 flex justify-center items-center w-full">
  <div className="">
    <div className="max-w-full overflow-hidden">
      <div className="flex mt-10">
        <h2 className="text-lg font-semibold mb-2 text-cyan-100">Student Table</h2>
      </div>
      <div className="shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="border-2 border-cyan-300">
            <tr>
              <th className="py-2 px-6">Image</th>
              <th className="py-2 px-6">Date</th>
            </tr>
          </thead>
          <tbody>
            {imageData.map((item) => (
              <tr key={item.id}>
                <td className="pl-10 p-6 ">
                  <img
                    src={item.imageUrl}
                    alt="Student"
                  className="w-24 rounded-xl "
                  />
                </td>
                <td className="text-center">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


    <div className="ml-32">
    <button  onClick={fetchData}>show User</button></div>
    <div>
      <div className="text-end align-end mt-10 mr-10">
        <button
          onClick={openModal}
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
  <div>
  {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>Enter Your Name</h2>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
              <button onClick={handleSubmit}>Submit</button>
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
