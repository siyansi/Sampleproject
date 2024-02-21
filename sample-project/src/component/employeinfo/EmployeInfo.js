import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection,getDocs } from 'firebase/firestore';


const EmployeInfo = () => {

  const [val,setVal]=useState([]);
 
  const value=collection(db,"users")

  useEffect(()=>{
    const getData=async()=>{
      const dbval=await getDocs(value)
      setVal(dbval.docs.map(doc=>({...doc.data(),id:doc.id})))
    }
    getData()
  })


   

  return (
    <div>
    <table>
      <thead>
        <tr>
          <td>USERNAME</td>
          <td>EMAIL</td>
          <td>ROLE</td>
        </tr>
      </thead>
      <tbody>
          {val.map(details=>(
            <tr key={details.id}>
              <td>{details.userName}</td>
              <td>{details.email}</td>
              <td>{details.role}</td>
            </tr>
          ))}
       
      </tbody>
    </table>
     
    </div>
  );
};

export default EmployeInfo;


//   return (

//     <div>
//     <table>
//       <thead>
//         <tr>
//           <td>USERNAME</td>
//           <td>EMAIL</td>
//           <td>ROLE</td>
//         </tr>
//       </thead>
//       <tbody>
//           {val.map(details=>(
//             <tr key={details.id}>
//               <td>{details.userName}</td>
//               <td>{details.email}</td>
//               <td>{details.role}</td>
//             </tr>
//           ))}
       
//       </tbody>
//     </table>
     
//     </div>
//   );
// };


