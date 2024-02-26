// import React, { useState } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// //import { db } from '../../firebase/firebase.config';

// // Initialize Firebase
// const firebaseConfig = {
//   // Your Firebase configuration
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const db = firebase.firestore();

// const Profiles = () => {
 
      
//   const [selectedHeadings, setSelectedHeadings] = useState([]);
//   const [inputData, setInputData] = useState({});
//   const headings = ['Assigned', 'Status', 'Summary', 'Due', 'Project']; // Example headings

//   const handleCheckboxChange = (heading) => {
//     setSelectedHeadings(prevHeadings => {
//       if (prevHeadings.includes(heading)) {
//         return prevHeadings.filter(item => item !== heading);
//       } else {
//         return [...prevHeadings, heading];
//       }
//     });
//   };

//   const handleInputChange = (heading, value) => {
//     setInputData(prevData => ({ ...prevData, [heading]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await db.collection('tables').add({ selectedHeadings, inputData });
//       // Handle success
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
    
//     <div>
//       <h2>Select Headings and Input Data</h2>
//       <form onSubmit={handleSubmit}>
//         {headings.map((heading, index) => (
//           <div key={index} className="py-4 flex">
//             <input
//               type="checkbox"
//               checked={selectedHeadings.includes(heading)}
//               onChange={() => handleCheckboxChange(heading)}
//             />
//             <label htmlFor={heading}>{heading}</label>
//             {selectedHeadings.includes(heading) && (
//               <input
//                 type="text"
//                 value={inputData[heading] || ''}
//                 onChange={(e) => handleInputChange(heading, e.target.value)}
//               />
//             )}
//           </div>
//         ))}
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };


// export default Profiles
import React from 'react'

const Profiles = () => {
  return (
    <div  className="ml-80 mt-24" >Profiles</div>
  )
}

export default Profiles