// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/database';

// const FirebaseTable = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const db = firebase.database();
//         const snapshot = await db.ref('your/firebase/path').once('value');
//         const fetchedData = snapshot.val();
//         if (fetchedData) {
//           const dataArray = Object.keys(fetchedData).map(key => ({
//             id: key,
//             ...fetchedData[key]
//           }));
//           setData(dataArray);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();

//     // Clean up function (optional)
//     return () => {
//       // Do cleanup if necessary
//     };
//   }, []);

//   return (


// export default FirebaseTable;
