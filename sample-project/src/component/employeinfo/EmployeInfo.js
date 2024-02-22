import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase.config';
import { collection,getDocs } from 'firebase/firestore';


const EmployeInfo = () => {

  const [val,setVal]=useState([]);
 
  const value=collection(db,"user")

  useEffect(()=>{
    const getData=async()=>{
      const dbval=await getDocs(value)
      setVal(dbval.docs.map(doc=>({...doc.data(),id:doc.id})))
    }
    getData()
  })


   

  return (
    <div className='  lg:ml-80 mt-24'>
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


// import React from 'react'

// const EmployeInfo = () => {
//   return (
//     <div className=' mt-24'>EmployeInfo</div>
//   )
// }

// export default EmployeInfo